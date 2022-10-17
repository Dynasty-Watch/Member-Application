import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import ReactFC from "react-fusioncharts";
import radar from "fusioncharts/fusioncharts.zoomline";
ReactFusioncharts.fcRoot(FusionCharts, charts, radar)

//charts(FusionCharts);

const dataSource = {
    chart: {
        caption: "Skill Analysis of Harry",
        subcaption: "Scale: 1 (low) to 5 (high)",
        theme: "fusion",
        showlegend: "0",
        showdivlinevalues: "0",
        showlimits: "0",
        showvalues: "1",
        plotfillalpha: "40",
        plottooltext: "Harry's <b>$label</b> skill is rated as <b>$value</b>"
    },
    categories: [
        {
            category: [
                {
                    label: "Communication"
                },
                {
                    label: "Punctuality"
                },
                {
                    label: "Problem Solving"
                },
                {
                    label: "Meeting Deadlines"
                },
                {
                    label: "Team Player"
                },
                {
                    label: "Technical Knowledge"
                }
            ]
        }
    ],
    dataset: [
        {
            seriesname: "User Ratings",
            data: [
                {
                    value: "3"
                },
                {
                    value: "3"
                },
                {
                    value: "4"
                },
                {
                    value: "3"
                },
                {
                    value: "2"
                },
                {
                    value: "4"
                }
            ]
        }
    ]
};

const ChartConfigs = {
    type: "radar",
    width: "100%",
    height: "100%",
    dataFormat: "JSON",
    dataSource: dataSource
}

export const RadarChart = () => {
    return <ReactFC {...ChartConfigs} />
}
