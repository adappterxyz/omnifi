export const accounts =[{label:'account0'},{label:'account1'}];


export const actions =[

  {'action':'release payment','data':'outgoingbeneficiary'},
  {'action':'calculate payout','data':'formula'},
  {'action':'perform fixing','data':'mktpricedataset'},
  {'action':'generates output','data':'dataset'},
  {'action':'sends notice','data':'mktpricedataset'},
];


export const conditions =[
  {'action':'period','data':'week'},
  {'action':'marketprice','data':'outgoingbeneficiary'},
  {'action':'calculate payout','data':'formula'},
  {'action':'capture payment','data':'incomingbeneficiary'},
];


export const contracts =[];

export const wallets =[];

export const dummyflow = {
    "nodes": [
      {
        "id": "1",
        "type": "startNode",
        "data": { "label": "Contract Deployed" },
        "position": { "x": 100, "y": 250 }
      },
      {
        "id": "2",
        "type": "actionNode",
        "data": { "label": "Underlying assets deposited" },
        "position": { "x": 300, "y": 250 }
      },
      {
        "id": "3",
        "type": "conditionNode",
        "data": { "label": "Contract funded with Investment Amount?" },
        "position": { "x": 500, "y": 250 }
      },
      {
        "id": "4",
        "type": "actionNode",
        "data": { "label": "Offer is void, underlying assets refunded to wallet" },
        "position": { "x": 700, "y": 100 }
      },
      {
        "id": "5",
        "type": "actionNode",
        "data": { "label": "Lifecycle kicks off" },
        "position": { "x": 700, "y": 400 }
      },
      {
        "id": "6",
        "type": "conditionNode",
        "data": { "label": "Week 4: BTC Price Fixes Above P(CL)?" },
        "position": { "x": 900, "y": 250 }
      },
      {
        "id": "7",
        "type": "actionNode",
        "data": { "label": "Prompt issuer to fund vault with 2136.99" },
        "position": { "x": 1100, "y": 100 }
      },
      {
        "id": "8",
        "type": "actionNode",
        "data": { "label": "Investor receives 1,994.52" },
        "position": { "x": 1100, "y": 400 }
      },
      {
        "id": "9",
        "type": "conditionNode",
        "data": { "label": "Week 8: BTC Price Fixes Above P(CL)?" },
        "position": { "x": 1300, "y": 250 }
      },
      {
        "id": "10",
        "type": "actionNode",
        "data": { "label": "Prompt issuer to fund vault with 2136.99" },
        "position": { "x": 1500, "y": 100 }
      },
      {
        "id": "11",
        "type": "actionNode",
        "data": { "label": "Investor receives 1,994.52" },
        "position": { "x": 1500, "y": 400 }
      },
      {
        "id": "12",
        "type": "conditionNode",
        "data": { "label": "Week 12/Maturity: BTC Price Fixes Above P(CL)?" },
        "position": { "x": 1700, "y": 250 }
      },
      {
        "id": "13",
        "type": "actionNode",
        "data": { "label": "Prompt issuer to fund vault with 100,000 + 1994.52" },
        "position": { "x": 1900, "y": 100 }
      },
      {
        "id": "14",
        "type": "actionNode",
        "data": { "label": "Investor receives 1,994.52" },
        "position": { "x": 1900, "y": 400 }
      },
      {
        "id": "15",
        "type": "conditionNode",
        "data": { "label": "BTC Price Fixes Above P(PL)?" },
        "position": { "x": 2100, "y": 250 }
      },
      {
        "id": "16",
        "type": "beneficiaryNode",
        "data": { "label": "Investor receives 100k USD" },
        "position": { "x": 2300, "y": 100 }
      },
      {
        "id": "17",
        "type": "beneficiaryNode",
        "data": { "label": "Investor receives 100k USD of BTC @ 26.68k/btc" },
        "position": { "x": 2300, "y": 400 }
      },
      {
        "id": "18",
        "type": "actionNode",
        "data": { "label": "Failure to fund account ahead of payment date" },
        "position": { "x": 500, "y": 100 }
      },
      {
        "id": "19",
        "type": "beneficiaryNode",
        "data": { "label": "Underlying assets released to investors" },
        "position": { "x": 300, "y": 100 }
      }
    ],
     "edges": 
     [   {
        "id": "e1-2",
        "source": "1",
        "target": "2",
        "type": "smoothstep",
        "animated": true,
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e2-3",
        "source": "2",
        "target": "3",
        "type": "smoothstep",
        "animated": true,
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e3-4",
        "source": "3",
        "target": "4",
        "type": "smoothstep",
        "animated": true,
        "label": "No",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e3-5",
        "source": "3",
        "target": "5",
        "type": "smoothstep",
        "animated": true,
        "label": "Yes",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e5-6",
        "source": "5",
        "target": "6",
        "type": "smoothstep",
        "animated": true,
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e6-7",
        "source": "6",
        "target": "7",
        "type": "smoothstep",
        "animated": true,
        "label": "Yes",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e6-8",
        "source": "6",
        "target": "8",
        "type": "smoothstep",
        "animated": true,
        "label": "No",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e7-9",
        "source": "7",
        "target": "9",
        "type": "smoothstep",
        "animated": true,
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e8-9",
        "source": "8",
        "target": "9",
        "type": "smoothstep",
        "animated": true,
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e9-10",
        "source": "9",
        "target": "10",
        "type": "smoothstep",
        "animated": true,
        "label": "Yes",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e9-11",
        "source": "9",
        "target": "11",
        "type": "smoothstep",
        "animated": true,
        "label": "No",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e10-12",
        "source": "10",
        "target": "12",
        "type": "smoothstep",
        "animated": true,
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e11-12",
        "source": "11",
        "target": "12",
        "type": "smoothstep",
        "animated": true,
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e12-13",
        "source": "12",
        "target": "13",
        "type": "smoothstep",
        "animated": true,
        "label": "Yes",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e12-14",
        "source": "12",
        "target": "14",
        "type": "smoothstep",
        "animated": true,
        "label": "No",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e13-15",
        "source": "13",
        "target": "15",
        "type": "smoothstep",
        "animated": true,
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e14-15",
        "source": "14",
        "target": "15",
        "type": "smoothstep",
        "animated": true,
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e15-16",
        "source": "15",
        "target": "16",
        "type": "smoothstep",
        "animated": true,
        "label": "Yes",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e15-17",
        "source": "15",
        "target": "17",
        "type": "smoothstep",
        "animated": true,
        "label": "No",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e3-18",
        "source": "3",
        "target": "18",
        "type": "smoothstep",
        "animated": true,
        "label": "No",
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      },
      {
        "id": "e18-19",
        "source": "18",
        "target": "19",
        "type": "smoothstep",
        "animated": true,
        "style": { "stroke": "#FFF", "strokeWidth": 2 }
      }
    ]}


export const eg2 = {
  "nodes": [
    {
      "id": "1",
      "type": "startNode",
      "data": { "label": "Trade Capture" },
      "position": { "x": 100, "y": 250 }
    },
    {
      "id": "2",
      "type": "actionNode",
      "data": { "label": "Validate Trade Details" },
      "position": { "x": 300, "y": 250 }
    },
    {
      "id": "3",
      "type": "conditionNode",
      "data": { "label": "Trade Valid?" },
      "position": { "x": 500, "y": 250 }
    },
    {
      "id": "4",
      "type": "actionNode",
      "data": { "label": "Book Trade" },
      "position": { "x": 700, "y": 100 }
    },
    {
      "id": "5",
      "type": "actionNode",
      "data": { "label": "Send Confirmation" },
      "position": { "x": 700, "y": 400 }
    },
    {
      "id": "6",
      "type": "conditionNode",
      "data": { "label": "Trade Life Cycle Event?" },
      "position": { "x": 900, "y": 250 }
    },
    {
      "id": "7",
      "type": "actionNode",
      "data": { "label": "Apply Fixing" },
      "position": { "x": 1100, "y": 100 }
    },
    {
      "id": "8",
      "type": "actionNode",
      "data": { "label": "Calculate Accrued Interest" },
      "position": { "x": 1100, "y": 400 }
    },
    {
      "id": "9",
      "type": "conditionNode",
      "data": { "label": "Barrier Breach?" },
      "position": { "x": 1300, "y": 250 }
    },
    {
      "id": "10",
      "type": "actionNode",
      "data": { "label": "Auto-Call/Auto-Put" },
      "position": { "x": 1500, "y": 100 }
    },
    {
      "id": "11",
      "type": "actionNode",
      "data": { "label": "Send Notification" },
      "position": { "x": 1500, "y": 400 }
    },
    {
      "id": "12",
      "type": "conditionNode",
      "data": { "label": "Maturity Date Reached?" },
      "position": { "x": 1700, "y": 250 }
    },
    {
      "id": "13",
      "type": "actionNode",
      "data": { "label": "Settle Trade" },
      "position": { "x": 1900, "y": 100 }
    },
    {
      "id": "14",
      "type": "actionNode",
      "data": { "label": "Send Final Notification" },
      "position": { "x": 1900, "y": 400 }
    }
  ],
  "edges": [
    {
      "id": "e1-2",
      "source": "1",
      "target": "2",
      "type": "smoothstep",
      "animated": true,
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e2-3",
      "source": "2",
      "target": "3",
      "type": "smoothstep",
      "animated": true,
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e3-4",
      "source": "3",
      "target": "4",
      "type": "smoothstep",
      "animated": true,
      "label": "Yes",
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e3-5",
      "source": "3",
      "target": "5",
      "type": "smoothstep",
      "animated": true,
      "label": "No",
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e5-6",
      "source": "5",
      "target": "6",
      "type": "smoothstep",
      "animated": true,
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e6-7",
      "source": "6",
      "target": "7",
      "type": "smoothstep",
      "animated": true,
      "label": "Fixing Date",
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e6-8",
      "source": "6",
      "target": "8",
      "type": "smoothstep",
      "animated": true,
      "label": "Accrual Date",
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e7-9",
      "source": "7",
      "target": "9",
      "type": "smoothstep",
      "animated": true,
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e8-9",
      "source": "8",
      "target": "9",
      "type": "smoothstep",
      "animated": true,
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e9-10",
      "source": "9",
      "target": "10",
      "type": "smoothstep",
      "animated": true,
      "label": "Yes",
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e9-11",
      "source": "9",
      "target": "11",
      "type": "smoothstep",
      "animated": true,
      "label": "No",
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e10-12",
      "source": "10",
      "target": "12",
      "type": "smoothstep",
      "animated": true,
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e11-12",
      "source": "11",
      "target": "12",
      "type": "smoothstep",
      "animated": true,
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e12-13",
      "source": "12",
      "target": "13",
      "type": "smoothstep",
      "animated": true,
      "label": "Yes",
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    },
    {
      "id": "e12-14",
      "source": "12",
      "target": "14",
      "type": "smoothstep",
      "animated": true,
      "label": "No",
      "style": { "stroke": "#FFF", "strokeWidth": 2 }
    }
  ]
}
export const eg = {
  "nodes": [
    {
      "id": "1",
      "type": "startNode",
      "data": {
        "label": "FCN"
      },
      "position": {
        "x": 210,
        "y": 240
      },
      "measured": {
        "width": 83,
        "height": 46
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "cnode-5",
      "type": "conditionNode",
      "data": {
        "label": "DVP conditions"
      },
      "position": {
        "x": 450,
        "y": 210
      },
      "measured": {
        "width": 120,
        "height": 120
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "node-6",
      "type": "actionNode",
      "data": {
        "label": "Void and refund"
      },
      "position": {
        "x": 615,
        "y": 420
      },
      "measured": {
        "width": 162,
        "height": 46
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "node-7",
      "type": "actionNode",
      "data": {
        "label": "DVP"
      },
      "position": {
        "x": 615,
        "y": 135
      },
      "measured": {
        "width": 83,
        "height": 46
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "cnode-8",
      "type": "conditionNode",
      "data": {
        "label": "Periodic Fixing"
      },
      "position": {
        "x": 915,
        "y": 225
      },
      "measured": {
        "width": 120,
        "height": 120
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "node-11",
      "type": "actionNode",
      "data": {
        "label": "Coupon Payment"
      },
      "position": {
        "x": 1095,
        "y": 195
      },
      "measured": {
        "width": 170,
        "height": 46
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "node-12",
      "type": "actionNode",
      "data": {
        "label": "KO"
      },
      "position": {
        "x": 1095,
        "y": 300
      },
      "measured": {
        "width": 74,
        "height": 46
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "node-13",
      "type": "actionNode",
      "data": {
        "label": "KI"
      },
      "position": {
        "x": 1095,
        "y": 390
      },
      "measured": {
        "width": 68,
        "height": 46
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "bnode-14",
      "type": "beneficiaryNode",
      "data": {
        "label": "Investor"
      },
      "position": {
        "x": 315,
        "y": 360
      },
      "measured": {
        "width": 90,
        "height": 90
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "bnode-15",
      "type": "beneficiaryNode",
      "data": {
        "label": "Issuer"
      },
      "position": {
        "x": 315,
        "y": 75
      },
      "measured": {
        "width": 90,
        "height": 90
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "cnode-16",
      "type": "conditionNode",
      "data": {
        "label": "Pending Payment"
      },
      "position": {
        "x": 1395,
        "y": 210
      },
      "measured": {
        "width": 120,
        "height": 120
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "node-17",
      "type": "actionNode",
      "data": {
        "label": "Default"
      },
      "position": {
        "x": 1545,
        "y": 345
      },
      "measured": {
        "width": 103,
        "height": 46
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "node-18",
      "type": "actionNode",
      "data": {
        "label": "Release Payment"
      },
      "position": {
        "x": 1560,
        "y": 150
      },
      "measured": {
        "width": 170,
        "height": 46
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "bnode-20",
      "type": "beneficiaryNode",
      "data": {
        "label": "Investor"
      },
      "position": {
        "x": 1830,
        "y": 60
      },
      "measured": {
        "width": 90,
        "height": 90
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "bnode-21",
      "type": "beneficiaryNode",
      "data": {
        "label": "Investor"
      },
      "position": {
        "x": 750,
        "y": 300
      },
      "measured": {
        "width": 90,
        "height": 90
      },
      "selected": true,
      "dragging": false
    },
    {
      "id": "bnode-22",
      "type": "beneficiaryNode",
      "data": {
        "label": "Issuer"
      },
      "position": {
        "x": 750,
        "y": 0
      },
      "measured": {
        "width": 90,
        "height": 90
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "bnode-23",
      "type": "beneficiaryNode",
      "data": {
        "label": "Issuer"
      },
      "position": {
        "x": 855,
        "y": 480
      },
      "measured": {
        "width": 90,
        "height": 90
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "node-24",
      "type": "actionNode",
      "data": {
        "label": "Maturity"
      },
      "position": {
        "x": 1650,
        "y": 540
      },
      "measured": {
        "width": 111,
        "height": 46
      },
      "selected": false,
      "dragging": false
    }
  ],
  "edges": [
    {
      "source": "cnode-5",
      "target": "node-7",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__cnode-5-node-7"
    },
    {
      "source": "cnode-5",
      "target": "node-6",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__cnode-5-node-6"
    },
    {
      "source": "node-7",
      "target": "cnode-8",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__node-7-cnode-8"
    },
    {
      "source": "cnode-8",
      "target": "cnode-9",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__cnode-8-cnode-9"
    },
    {
      "source": "cnode-8",
      "target": "node-11",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__cnode-8-node-11"
    },
    {
      "source": "cnode-8",
      "target": "node-12",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__cnode-8-node-12"
    },
    {
      "source": "cnode-8",
      "target": "node-13",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__cnode-8-node-13"
    },
    {
      "source": "1",
      "target": "cnode-5",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__1-cnode-5"
    },
    {
      "source": "bnode-14",
      "target": "cnode-5",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__bnode-14-cnode-5"
    },
    {
      "source": "bnode-15",
      "target": "cnode-5",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__bnode-15-cnode-5"
    },
    {
      "source": "node-11",
      "target": "cnode-16",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__node-11-cnode-16"
    },
    {
      "source": "cnode-16",
      "target": "node-18",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__cnode-16-node-18"
    },
    {
      "source": "cnode-16",
      "target": "node-17",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__cnode-16-node-17"
    },
    {
      "source": "node-18",
      "target": "bnode-20",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__node-18-bnode-20"
    },
    {
      "source": "node-7",
      "target": "bnode-22",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__node-7-bnode-22"
    },
    {
      "source": "node-7",
      "target": "bnode-21",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__node-7-bnode-21"
    },
    {
      "source": "node-6",
      "target": "bnode-23",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__node-6-bnode-23"
    },
    {
      "source": "node-18",
      "target": "cnode-8",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__node-18-cnode-8"
    },
    {
      "source": "cnode-8",
      "target": "node-24",
      "animated": true,
      "label": "",
      "type": "smoothstep",
      "style": {
        "stroke": "white",
        "strokeWidth": 2
      },
      "id": "xy-edge__cnode-8-node-24"
    }
  ],
  "viewport": {
    "x": -418.7630945377439,
    "y": -6.9490344941760895,
    "zoom": 1.3195079107728942
  }
}

export const dataset =[eg,eg2];