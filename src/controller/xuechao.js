const params1 = '{"columns":{"fAddress":{"name":"fAddress","type":"String"},"fBuilding":{"name":"fBuilding","type":"String"},"fCity":{"name":"fCity","type":"String"},"fContactName":{"name":"fContactName","type":"String"},"fDescription":{"name":"fDescription","type":"String"},"fEMail":{"name":"fEMail","type":"String"},"fID":{"name":"fID","type":"String"},"fImage":{"name":"fImage","type":"String"},"fJoinDate":{"name":"fJoinDate","type":"Date"},"fMinPrice":{"name":"fMinPrice","type":"Float"},"fName":{"name":"fName","type":"String"},"fPos":{"name":"fPos","type":"String"},"fProvince":{"name":"fProvince","type":"String"},"fService":{"name":"fService","type":"String"},"fStar":{"name":"fStar","type":"Float"},"fTelephone":{"name":"fTelephone","type":"String"},"fTraffic":{"name":"fTraffic","type":"String"},"fZone":{"name":"fZone","type":"String"}},"limit":10,"offset":30,"type":"","pos":"","province":"四川","city":"成都","price_low":"0","price_high":"99999","commonService":"","head":"","metro":""}'
let params2 = {
	"columns": {
		"f9to10P": {
			"name": "f9to10P",
			"type": "Float"
		},
		"fArea": {
			"name": "fArea",
			"type": "Float"
		},
		"fCapaciity": {
			"name": "fCapaciity",
			"type": "Integer"
		},
		"fDescription": {
			"name": "fDescription",
			"type": "String"
		},
		"fID": {
			"name": "fID",
			"type": "String"
		},
		"fImage": {
			"name": "fImage",
			"type": "String"
		},
		"fName": {
			"name": "fName",
			"type": "String"
		},
		"fStoreID": {
			"name": "fStoreID",
			"type": "String"
		}
	},
	"limit": 9999,
	"offset": 0,
	"storeId": "C75EA23056E000015CF7159040D0A3F0"
};
let https = require('axios');
const fs = require("fs");
async function getData () {
  const options = {
    url: 'https://as.sharechao.com/xbaas/store',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    params: {
      action: 'query',
      params: params1
    },
    method: 'POST'
  };
  let returnData = []
  https.request(options)
    .then((res) => {
      let rowsXuechao = res.data.data.rows;
      console.log(rowsXuechao.length);
      let i = 1;
      rowsXuechao.forEach(row => {
          let params = JSON.parse(JSON.stringify(params2));
          params.storeId = row.fID.value;
          let options2 = {
            url: 'https://as.sharechao.com//xbaas/room',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            params: {
              action: 'queryRoomThroughStoreID',
              params: JSON.stringify(params)
            },
            method: 'POST'
          }
          setTimeout(function() {
            https.request(options2).then((res2) => {
              let roomRows = res2.data.data.rows;
              let roomCount = roomRows.length;
              roomRows.forEach(room => {
                let sqlTel = "INSERT INTO `test`.`test`(`fName`,`fDescription`,`roomCount`,`roomName`,`roomPrice`,`roomArea`,`roomPeople`,`roomDesc`) VALUES ('" +row.fName.value+ "','" +row.fDescription.value+ "','" +roomCount+ "','" +room.fName.value+ "','" +room.f9to10P.value+ "','" +room.fArea.value+ "','" +room.fCapaciity.value+ "','" +room.fDescription.value+ "');\n";
                fs.appendFile("./test.txt", sqlTel, (error)  => {
                  if (error) return console.log("追加文件失败" + error.message);
                });
              })
              console.log(i);
              i++;
            })
          }, 1000);
      });
    });
}

module.exports = {
  getData: getData
}