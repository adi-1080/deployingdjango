"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts"

interface ChartProps {
  data: any[]
  height?: number
  className?: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-green-200 rounded-lg shadow-lg">
        <p className="text-green-800 font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-green-600" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function EnhancedLineChart({ data, height = 300, className = "" }: ChartProps) {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [data])

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} key={animationKey}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
          <XAxis dataKey="name" stroke="#059669" tick={{ fill: "#059669" }} axisLine={{ stroke: "#059669" }} />
          <YAxis stroke="#059669" tick={{ fill: "#059669" }} axisLine={{ stroke: "#059669" }} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: "#059669", strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function EnhancedAreaChart({ data, height = 300, className = "" }: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
          <XAxis dataKey="name" stroke="#059669" />
          <YAxis stroke="#059669" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorGradient)"
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function EnhancedBarChart({ data, height = 300, className = "" }: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
          <XAxis dataKey="name" stroke="#059669" />
          <YAxis stroke="#059669" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={1000} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function EnhancedPieChart({ data, height = 300, className = "" }: ChartProps) {
  const COLORS = ["#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#022c22"]

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RadialProgressChart({ data, height = 200, className = "" }: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={data}>
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill: "#fff" }}
            background
            clockWise
            dataKey="value"
            fill="#10b981"
          />
          <Tooltip content={<CustomTooltip />} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ComboChart({ data, height = 300, className = "" }: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
          <XAxis dataKey="name" stroke="#059669" />
          <YAxis stroke="#059669" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="bookings" fill="#10b981" radius={[2, 2, 0, 0]} />
          <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export function useRealTimeData(initialData: any[], updateInterval = 5000) {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          value: item.value + Math.floor(Math.random() * 10) - 5, // Random fluctuation
        })),
      )
    }, updateInterval)

    return () => clearInterval(interval)
  }, [updateInterval])

  return data
}

export function HeatmapChart({ data, height = 300, className = "" }: ChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className={`${className} p-4`}>
      <div className="grid grid-cols-7 gap-1" style={{ height }}>
        {data.map((item, index) => {
          const intensity = item.value / maxValue
          const opacity = Math.max(0.1, intensity)

          return (
            <div
              key={index}
              className="flex items-center justify-center text-xs font-medium text-white rounded"
              style={{
                backgroundColor: `rgba(16, 185, 129, ${opacity})`,
                minHeight: "40px",
              }}
              title={`${item.name}: ${item.value}`}
            >
              {item.value}
            </div>
          )
        })}
      </div>
    </div>
  )
}
