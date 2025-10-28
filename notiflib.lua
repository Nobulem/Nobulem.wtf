local cloneref = cloneref or function(obj) return obj end

local CoreGui = cloneref(game:GetService("CoreGui"))
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "FatalityHitLogs"
ScreenGui.IgnoreGuiInset = true
ScreenGui.ResetOnSpawn = false
ScreenGui.Parent = CoreGui

local Holder = Instance.new("Frame")
Holder.AnchorPoint = Vector2.new(1, 0)
Holder.Position = UDim2.new(1, -20, 0, 20)
Holder.Size = UDim2.new(0, 300, 1, -40)
Holder.BackgroundTransparency = 1
Holder.Parent = ScreenGui

local Layout = Instance.new("UIListLayout")
Layout.Parent = Holder
Layout.SortOrder = Enum.SortOrder.LayoutOrder
Layout.VerticalAlignment = Enum.VerticalAlignment.Bottom
Layout.Padding = UDim.new(0, 4)

local NotificationModule = {}
local ActiveNotifs = {}

function NotificationModule.Notify(text, duration)
    duration = duration or 3

    local label = Instance.new("TextLabel")
    label.Parent = Holder
    label.Size = UDim2.new(1, 0, 0, 20)
    label.BackgroundTransparency = 1
    label.Text = string.lower(text)
    label.Font = Enum.Font.GothamSemibold
    label.TextSize = 16
    label.TextColor3 = Color3.fromRGB(255, 255, 255)
    label.TextTransparency = 1
    label.TextStrokeTransparency = 1
    label.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
    label.TextXAlignment = Enum.TextXAlignment.Right

    table.insert(ActiveNotifs, label)

    task.spawn(function()
        for i = 1, 10 do
            label.TextTransparency = 1 - (i / 10)
            label.TextStrokeTransparency = 1 - (i / 10) * 0.6
            task.wait(0.02)
        end

        task.wait(duration)
        for i = 1, 10 do
            label.TextTransparency = i / 10
            label.TextStrokeTransparency = i / 10
            task.wait(0.02)
        end

        label:Destroy()
        table.remove(ActiveNotifs, table.find(ActiveNotifs, label))
    end)
end

return NotificationModule
