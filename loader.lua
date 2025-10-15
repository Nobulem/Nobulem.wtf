local Library = loadstring(game:HttpGet("https://raw.githubusercontent.com/deividcomsono/Obsidian/refs/heads/main/Library.lua"))()

local CONFIG = {
    RETRY_ATTEMPTS = 3,
    RETRY_DELAY = 2,
    SCRIPT_ENDPOINT = "https://api.luarmor.net/files/v3/loaders/",
}

local Games = {
    [17129858194] = {
        ScriptId = "fce9f2b938d2826ea10a048fbbccde58",
        Name = "Realm Rampage"
    },
    [13822562292] = {
        ScriptId = "dd089645975086ff98b2d7b9ec36470f",
        Name = "Midnight Chasers: Highway Racing"
    },
    [101874573809584] = {
        ScriptId = "fce9f2b938d2826ea10a048fbbccde58",
        Name = "[BR] Realm Rampage"
    },
    [86696142930150] = {
        ScriptId = "2694d97ea485619561a52b5f3558e333",
        Name = "Hypershot"
    },
    [100040622766961] = {
        ScriptId = "2694d97ea485619561a52b5f3558e333",
        Name = "Hypershot"
    },
    [108428559529058] = {
        ScriptId = "2694d97ea485619561a52b5f3558e333",
        Name = "[GAMEMODES] Hypershot"
    },
    [114984003116267] = {
        ScriptId = "fce9f2b938d2826ea10a048fbbccde58",
        Name = "[QUEUE] Realm Rampage"
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
    local success, response = false, nil
    
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
    
    local gameData = Games[game.PlaceId]
    
    if not gameData then
        notify("nobulem.wtf", "This game is not supported.", 6)
        return
    end
    
    notify("nobulem.wtf", "Loading script for " .. gameData.Name .. "...", 3)
    task.wait(0.5)
    
    if loadScript(gameData.ScriptId) then
        notify("nobulem.wtf", "Script loaded successfully for " .. gameData.Name .. "!", 4)
    else
        notify("nobulem.wtf", "Failed to load script for " .. gameData.Name .. ".", 6)
    end
end

local success, errorMsg = pcall(main)
if not success then
    notify("nobulem.wtf", "Loader error: " .. tostring(errorMsg), 6)
end
