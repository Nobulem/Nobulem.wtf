local NotificationLibrary = {}

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "FatalityNotificationUI"
ScreenGui.ResetOnSpawn = false
ScreenGui.IgnoreGuiInset = true
ScreenGui.Parent = game:GetService("CoreGui")

local Holder = Instance.new("Frame")
Holder.AnchorPoint = Vector2.new(1, 0)
Holder.Position = UDim2.new(1, -20, 0, 20)
Holder.Size = UDim2.new(0, 300, 1, -40)
Holder.BackgroundTransparency = 1
Holder.Parent = ScreenGui

local UIListLayout = Instance.new("UIListLayout")
UIListLayout.Parent = Holder
UIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
UIListLayout.VerticalAlignment = Enum.VerticalAlignment.Top
UIListLayout.Padding = UDim.new(0, 4)

function NotificationLibrary:Notify(text, duration)
    duration = duration or 3

    local label = Instance.new("TextLabel")
    label.Parent = Holder
    label.Size = UDim2.new(1, 0, 0, 20)
    label.BackgroundTransparency = 1
    label.Text = string.lower(text)
    label.Font = Enum.Font.GothamSemibold
    label.TextSize = 16
    label.TextColor3 = Color3.fromRGB(255, 255, 255)
    label.TextTransparency = 0
    label.TextStrokeTransparency = 0.6
    label.TextXAlignment = Enum.TextXAlignment.Right

    label.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)

    task.spawn(function()
        label.TextTransparency = 1
        label.TextStrokeTransparency = 1
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
    end)
end

return NotificationLibrary
