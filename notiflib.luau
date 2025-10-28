local HitLogs = {}
HitLogs.__index = HitLogs

local CONFIG = {
	Position = Vector2.new(0.5, 0.6),
	Spacing = 16,
	DisplayTime = 3,
	FadeTime = 0.5,
	MaxLogs = 8,
	Font = Enum.Font.Gotham,
	FontSize = 14,
	
	Colors = {
		White = Color3.fromRGB(255, 255, 255),
		Hit = Color3.fromRGB(148, 199, 59),
		Miss = Color3.fromRGB(255, 100, 100),
		Resolve = Color3.fromRGB(255, 0, 0),
		Spread = Color3.fromRGB(255, 199, 0),
	}
}

function HitLogs.new()
	local self = setmetatable({}, HitLogs)
	
	self.ScreenGui = Instance.new("ScreenGui")
	self.ScreenGui.Name = "FatalityHitLogs"
	self.ScreenGui.ResetOnSpawn = false
	self.ScreenGui.IgnoreGuiInset = true
	self.ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
	self.ScreenGui.Parent = game:GetService("CoreGui")
	
	self.Container = Instance.new("Frame")
	self.Container.Name = "LogContainer"
	self.Container.Size = UDim2.new(1, 0, 1, 0)
	self.Container.BackgroundTransparency = 1
	self.Container.Parent = self.ScreenGui
	
	self.Logs = {}
	
	return self
end

function HitLogs:CreateLog(textParts)
	if #self.Logs >= CONFIG.MaxLogs then
		self:RemoveLog(1)
	end
	
	local logFrame = Instance.new("Frame")
	logFrame.Name = "Log"
	logFrame.BackgroundTransparency = 1
	logFrame.Size = UDim2.new(1, 0, 0, CONFIG.FontSize + 4)
	logFrame.Parent = self.Container
	
	local xOffset = 0
	local textLabels = {}
	
	for _, part in ipairs(textParts) do
		local shadow = Instance.new("TextLabel")
		shadow.Name = "Shadow"
		shadow.BackgroundTransparency = 1
		shadow.Font = CONFIG.Font
		shadow.TextSize = CONFIG.FontSize
		shadow.Text = part.text
		shadow.TextColor3 = Color3.fromRGB(0, 0, 0)
		shadow.TextTransparency = 0.5
		shadow.TextXAlignment = Enum.TextXAlignment.Left
		shadow.Size = UDim2.new(0, 1000, 1, 0)
		shadow.Position = UDim2.new(0, xOffset + 1, 0, 1)
		shadow.Parent = logFrame
		Instance.new("TextLabel")
		text.Name = "Text"
		text.BackgroundTransparency = 1
		text.Font = CONFIG.Font
		text.TextSize = CONFIG.FontSize
		text.Text = part.text
		text.TextColor3 = part.color
		text.TextTransparency = 0
		text.TextXAlignment = Enum.TextXAlignment.Left
		text.Size = UDim2.new(0, 1000, 1, 0)
		text.Position = UDim2.new(0, xOffset, 0, 0)
		text.Parent = logFrame
		
		table.insert(textLabels, {text = text, shadow = shadow})
		
		local textBounds = game:GetService("TextService"):GetTextSize(
			part.text,
			CONFIG.FontSize,
			CONFIG.Font,
			Vector2.new(math.huge, math.huge)
		)
		xOffset = xOffset + textBounds.X
	end
	
	local totalWidth = xOffset
	for _, label in ipairs(textLabels) do
		local currentPos = label.text.Position
		label.text.Position = UDim2.new(
			CONFIG.Position.X,
			currentPos.X.Offset - totalWidth/2,
			CONFIG.Position.Y,
			0
		)
		label.shadow.Position = UDim2.new(
			CONFIG.Position.X,
			currentPos.X.Offset - totalWidth/2 + 1,
			CONFIG.Position.Y,
			1
		)
	end
	
	local logData = {
		frame = logFrame,
		labels = textLabels,
		startTime = tick(),
		alpha = 1
	}
	
	table.insert(self.Logs, logData)
	self:UpdatePositions()
	
	return logData
end

function HitLogs:UpdatePositions()
	for i, log in ipairs(self.Logs) do
		local targetY = CONFIG.Position.Y + ((i - 1) * CONFIG.Spacing / 1000)
		
		for _, label in ipairs(log.labels) do
			label.text.Position = UDim2.new(
				label.text.Position.X.Scale,
				label.text.Position.X.Offset,
				targetY,
				0
			)
			label.shadow.Position = UDim2.new(
				label.shadow.Position.X.Scale,
				label.shadow.Position.X.Offset,
				targetY,
				1
			)
		end
	end
end

function HitLogs:Update()
	local currentTime = tick()
	
	for i = #self.Logs, 1, -1 do
		local log = self.Logs[i]
		local elapsed = currentTime - log.startTime
		
		if elapsed > CONFIG.DisplayTime then
			local fadeProgress = (elapsed - CONFIG.DisplayTime) / CONFIG.FadeTime
			log.alpha = math.max(0, 1 - fadeProgress)
			
			for _, label in ipairs(log.labels) do
				label.text.TextTransparency = 1 - log.alpha
				label.shadow.TextTransparency = 1 - (log.alpha * 0.5)
			end
			
			if log.alpha <= 0 then
				log.frame:Destroy()
				table.remove(self.Logs, i)
				self:UpdatePositions()
			end
		end
	end
end

function HitLogs:RemoveLog(index)
	if self.Logs[index] then
		self.Logs[index].frame:Destroy()
		table.remove(self.Logs, index)
		self:UpdatePositions()
	end
end

function HitLogs:Hit(targetName, hitbox, damage, healthRemaining)
	return self:CreateLog({
		{text = "hit ", color = CONFIG.Colors.White},
		{text = targetName, color = CONFIG.Colors.Hit},
		{text = "'s ", color = CONFIG.Colors.White},
		{text = hitbox, color = CONFIG.Colors.Hit},
		{text = " for ", color = CONFIG.Colors.White},
		{text = tostring(damage), color = CONFIG.Colors.Hit},
		{text = " damage (", color = CONFIG.Colors.White},
		{text = tostring(healthRemaining), color = CONFIG.Colors.Hit},
		{text = " health remaining)", color = CONFIG.Colors.White},
	})
end

function HitLogs:Miss(targetName, hitbox, reason, hitchance)
	return self:CreateLog({
		{text = "missed ", color = CONFIG.Colors.White},
		{text = targetName, color = CONFIG.Colors.Miss},
		{text = "'s ", color = CONFIG.Colors.White},
		{text = hitbox, color = CONFIG.Colors.Miss},
		{text = " due to ", color = CONFIG.Colors.White},
		{text = reason, color = CONFIG.Colors.Miss},
		{text = " (", color = CONFIG.Colors.White},
		{text = tostring(hitchance), color = CONFIG.Colors.Miss},
		{text = "% hitchance)", color = CONFIG.Colors.White},
	})
end

function HitLogs:Custom(parts)
	return self:CreateLog(parts)
end

function HitLogs:Destroy()
	if self.ScreenGui then
		self.ScreenGui:Destroy()
	end
end

return HitLogs
