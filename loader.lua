--[[
    nobulem.wtf - loader.luau
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Library = loadstring(game:HttpGet("https://raw.githubusercontent.com/deividcomsono/Obsidian/refs/heads/main/Library.lua"))()
assert(Library, "Failed to load the core library.")

local CONFIG = {
    MAX_LOAD_ATTEMPTS = 2,
    RETRY_ATTEMPTS = 3,
    RETRY_DELAY = 2,
    SCRIPT_ENDPOINT = "https://api.luarmor.net/files/v3/loaders/",
}

local Games = {
    {
        Name = "Hypershot",
        ScriptId = "2694d97ea485619561a52b5f3558e333",
        CheckFunction = function() return ReplicatedStorage:FindFirstChild("Weapons") ~= nil end
    },
    {
        Name = "Realm Rampage",
        ScriptId = "fce9f2b938d2826ea10a048fbbccde58",
        CheckFunction = function() return ReplicatedStorage:FindFirstChild("Replicate") ~= nil end
    },
    {
        Name = "Basketball Arcade",
        ScriptId = "f877b0ab51646a1c99ba41dbad3e6e15",
        CheckFunction = function() return game:GetService("ReplicatedStorage"):FindFirstChild("Zone"):WaitForChild("RotatedRegion3") ~= nil end
    },
    {
        Name = "Midnight Chasers: Highway Racing",
        ScriptId = "dd089645975086ff98b2d7b9ec36470f",
        CheckFunction = function() return ReplicatedStorage:FindFirstChild("NitrousVFX") ~= nil end
    }
}

local function notify(title, text, duration)
    Library:Notify({
        Title = title or "nobulem.wtf",
        Description = text or "No message provided.",
        Time = duration or 5
    })
end

local function loadScript(scriptId)
    local response = nil
    
    for attempt = 1, CONFIG.RETRY_ATTEMPTS do
        local success, result = pcall(function()
            return game:HttpGet(CONFIG.SCRIPT_ENDPOINT .. scriptId .. ".lua")
        end)
        
        if success then
            response = result
            break
        else
            notify("Loader Status", string.format("Failed to fetch script. Retrying (%d/%d)...", attempt, CONFIG.RETRY_ATTEMPTS), 3)
            if attempt < CONFIG.RETRY_ATTEMPTS then
                task.wait(CONFIG.RETRY_DELAY)
            end
        end
    end
    
    if not response then
        notify("Loader Error", "Could not load script after " .. CONFIG.RETRY_ATTEMPTS .. " attempts. Please rejoin.", 7)
        return false
    end
    
    local success, scriptFunc = pcall(loadstring, response)
    if not success or typeof(scriptFunc) ~= "function" then
        notify("Loader Error", "Invalid script format received. The script might be patched.", 7)
        return false
    end
    
    local execSuccess, errorMsg = pcall(scriptFunc)
    if not execSuccess then
        notify("Script Error", "The script failed to execute: " .. tostring(errorMsg), 7)
        return false
    end
    
    return true
end

local function main()
    getgenv().nobulem_loaded_count = (getgenv().nobulem_loaded_count or 0) + 1
    if getgenv().nobulem_loaded_count > CONFIG.MAX_LOAD_ATTEMPTS then
        notify("Loader Warning", "Maximum load attempts (" .. CONFIG.MAX_LOAD_ATTEMPTS .. ") reached. Please re-execute.", 6)
        return
    end

    local targetGame = nil
    for _, gameData in ipairs(Games) do
        local success, isSupported = pcall(gameData.CheckFunction)
        if success and isSupported then
            targetGame = gameData
            break
        end
    end

    if not targetGame then
        notify("Loader Status", "This game is not supported.", 6)
        return
    end

    notify("Loader Status", "Detected " .. targetGame.Name .. ". Loading script...", 4)
    task.wait(0.5)
    
    if loadScript(targetGame.ScriptId) then
        notify("Loader Status", "Script loaded successfully for " .. targetGame.Name .. "!", 5)
    else
        notify("Loader Error", "Failed to load script for " .. targetGame.Name .. ".", 6)
    end
end

local success, errorMessage = pcall(main)
if not success then
    notify("Critical Loader Error", "An unexpected error occurred: " .. tostring(errorMessage), 8)
end
