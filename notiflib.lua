local cloneref = cloneref or function(obj) return obj end

local CoreGui = cloneref(game:GetService("CoreGui"))
local TweenService = cloneref(game:GetService("TweenService"))

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
Layout.SortOrder = Enum.SortOrder.LayoutOrder
Layout.Padding = UDim.new(0, 4)
Layout.VerticalAlignment = Enum.VerticalAlignment.Top
Layout.Parent = Holder

local NotificationModule = {}

function NotificationModule.Notify(text, duration)
	duration = duration or 3

	local label = Instance.new("TextLabel")
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
	label.Parent = Holder
	local fadeIn = TweenService:Create(label, TweenInfo.new(0.2), {
		TextTransparency = 0,
		TextStrokeTransparency = 0.4
	})
	fadeIn:Play()

	task.delay(duration, function()
		local fadeOut = TweenService:Create(label, TweenInfo.new(0.3), {
			TextTransparency = 1,
			TextStrokeTransparency = 1
		})
		fadeOut:Play()
		fadeOut.Completed:Wait()
		label:Destroy()
	end)
end

return NotificationModule
