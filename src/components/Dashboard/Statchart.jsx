"use client";

import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const StatChart = ({ statData }) => {

    const chartData = statData.map(item => ({
        name: item.ticket_title,
        revenue: item.totalRevenue,
    }));

    return (
        <div className="p-8">
            <ResponsiveContainer width="100%" height={450}>
                <BarChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 20,
                        bottom: 80,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-20}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 12 }}
                    />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="revenue"
                        name="Revenue (BDT)"
                        fill="#8884d8"
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatChart;