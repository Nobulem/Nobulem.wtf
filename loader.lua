local Library = loadstring(game:HttpGet("https://raw.githubusercontent.com/deividcomsono/Obsidian/refs/heads/main/Library.lua"))()

local CONFIG = {
    RETRY_ATTEMPTS = 3,
    RETRY_DELAY = 2,
    SCRIPT_ENDPOINT = "https://api.luarmor.net/files/v3/loaders/",
}

--[[
    nobulem.wtf - loader.luau
]]

local Games = {
    {
        Name = "Hypershot",
        ScriptId = "2694d97ea485619561a52b5f3558e333",
        CheckFunction = function()
            return game:GetService("ReplicatedStorage"):FindFirstChild("Weapons") ~= nil
        end
    },
    {
        Name = "Realm Rampage",
        ScriptId = "fce9f2b938d2826ea10a048fbbccde58",
        CheckFunction = function()
            return game:GetService("ReplicatedStorage"):FindFirstChild("Replicate") ~= nil
        end
    },
    {
        Name = "Midnight Chasers: Highway Racing",
        ScriptId = "dd089645975086ff98b2d7b9ec36470f",
        CheckFunction = function()
            return game:GetService("ReplicatedStorage"):FindFirstChild("SpawnCar") ~= nil
        end
    }
}

local function notify(title, text, duration)
    Library:Notify({
        Title = title or "nobulem.wtf",
        Description = text or "No message provided.",
        Time = duration or 4
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
            notify("nobulem.wtf", "Failed to fetch script (Attempt " .. attempt .. "/" .. CONFIG.RETRY_ATTEMPTS .. ")", 3)
            if attempt < CONFIG.RETRY_ATTEMPTS then
                task.wait(CONFIG.RETRY_DELAY)
            end
        end
    end
    
    if not response then
        notify("nobulem.wtf", "Failed to load script after " .. CONFIG.RETRY_ATTEMPTS .. " attempts.", 6)
        return false
    end
    
    local success, executor = pcall(loadstring, response)
    if success and typeof(executor) == "function" then
        local execSuccess, errorMsg = pcall(executor)
        if not execSuccess then
            notify("nobulem.wtf", "Script execution failed: " .. tostring(errorMsg), 6)
            return false
        end
        return true
    else
        notify("nobulem.wtf", "Invalid script format received.", 6)
        return false
    end
end

local function main()
    getgenv().loaded = getgenv().loaded or { count = 0, max_attempts = 2 }
    
    if getgenv().loaded.count >= getgenv().loaded.max_attempts then
        notify("nobulem.wtf", "Maximum load attempts (" .. getgenv().loaded.max_attempts .. ") reached.", 6)
        return
    end
    
    getgenv().loaded.count = getgenv().loaded.count + 1
    
    local supportedGames = {}
    
    for _, gameData in ipairs(Games) do
        local success, result = pcall(gameData.CheckFunction)
        if success and result then
            table.insert(supportedGames, gameData)
        end
    end
    
    if #supportedGames == 0 then
        notify("nobulem.wtf", "No supported games detected.", 6)
        return
    end
    
    local targetGame = supportedGames[1]
    
    if #supportedGames > 1 then
        local gameNames = ""
        for i, game in ipairs(supportedGames) do
            gameNames = gameNames .. game.Name
            if i < #supportedGames then
                gameNames = gameNames .. ", "
            end
        end
        notify("nobulem.wtf", "Multiple games detected: " .. gameNames .. ". Loading " .. targetGame.Name, 4)
    else
        notify("nobulem.wtf", .. targetGame.Name .. " loading script...", 3)
    end
    
    task.wait(0.5)
    
    if loadScript(targetGame.ScriptId) then
        notify("nobulem.wtf", "Script loaded successfully for " .. targetGame.Name .. "!", 4)
    else
        notify("nobulem.wtf", "Failed to load script for " .. targetGame.Name .. ".", 6)
    end
end

local success, errorMsg = pcall(main)
if not success then
    notify("nobulem.wtf", "Loader error: " .. tostring(errorMsg), 6)
end
