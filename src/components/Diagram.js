import React, { useEffect } from 'react';
import go from 'gojs';

const Diagram = () => {
    useEffect(() => {
        const $ = go.GraphObject.make;

        const myDiagram =
        $(go.Diagram, "diagramDiv",
            {
                "clickCreatingTool.archetypeNodeData": { text: "Node", color: "lightgray" },
                initialContentAlignment: go.Spot.Center
            });

        myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "Rectangle", 
                { 
                    stroke: null,
                    portId: "",
                    cursor: "pointer",
                    fromLinkable: true, fromLinkableDuplicates: true, fromLinkableSelfNode: true,
                    toLinkable: true, toLinkableDuplicates: true, toLinkableSelfNode: true,
                    fill: "white" 
                }),
            $(go.TextBlock, { margin: 8 },
            new go.Binding("text", "key"))
        );

        myDiagram.model = new go.GraphLinksModel(
        [
            { key: "Alpha" },
            { key: "Beta" },
            { key: "Gamma" }
        ],
        [
            { from: "Alpha", to: "Beta" },
            { from: "Alpha", to: "Gamma" }
        ]);

        return () => {
            myDiagram.div = null;
        };

    }, []);

    return <div id="diagramDiv" style={{ width: '100%', height: '600px' }}></div>;
};

export default Diagram;
