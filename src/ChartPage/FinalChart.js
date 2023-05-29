import React, { useState, useEffect, useRef } from "react";
import { Line, Bar } from "react-chartjs-2";

function FinalChart({ chartData, chartType, yLabel }) {
  const style = {
    backgroundColor: "black",
    padding: "2%",
    color: "white",
  };

  const [chartInstance, setChartInstance] = useState(null);

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance) {
      setChartInstance(chartRef.current.chartInstance);
    }
  }, [chartRef, chartInstance]);

  useEffect(() => {
    if (chartInstance) {
      const handleResize = () => chartInstance.resize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [chartInstance]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.75,
    legend: {
      labels: {
        fontColor: "blue",
        fontSize: 18,
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (val, index) {
            return index % 2 === 0 ? this.getLabelForValue(val) : "";
          },
          color: "white",
          pointStyle: "square",
        },
        title: {
          display: true,
          text: "Game Week",
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
          pointStyle: "square",
        },
        title: {
          display: true,
          text: yLabel,
          color: "white",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            var index = parseInt(context.label) - 1;
            var label = context.dataset.label || "";
            if (context.dataset.data[index].description !== undefined) {
              label += context.dataset.data[index].description;
            }
            return label;
          },
        },
      },
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  if (chartType) {
    return (
      <Bar ref={chartRef} data={chartData} style={style} options={options} />
    );
  } else {
    return (
      <Line
        ref={chartRef}
        style={style}
        options={options}
        data={chartData}
        plugins={{}}
      />
    );
  }
}

export default FinalChart;
