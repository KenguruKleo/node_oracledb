
var fs = require('fs');
var oracledb = require('oracledb');

// Get a non-pooled connection
oracledb.getConnection(
    {
        user          : '',
        password      : '',
        connectString : ''
    },
    function(err, connection)
    {
        if (err) {
            console.error(err.message);
            return;
        }

        console.log("argv: "+process.argv[2]);

        //var templateId = 10534;
        var templateId = +process.argv[2];

        //fs.rmdirSync(''+templateId);

        fs.mkdirSync(''+templateId);

        connection.execute(
            //"SELECT * FROM GLOBAL_NAME",[],
            //The statement to execute
            "select TEMPLATEID, SUBJECT, BODYHTML, BODYTEXT " +
            "FROM SMTP_NTEMPLATES " +
            "WHERE LANGUAGEID=1033 AND TEMPLATEID = :id",

            // The "bind value" for the "bind variable" :id
            [templateId],

            // Optional execute options argument, such as the query result format
            // or whether to get extra metadata
            // { outFormat: oracledb.OBJECT, extendedMetaData: true },
            { fetchInfo: { "BODYHTML": { type: oracledb.STRING}, "BODYTEXT": { type: oracledb.STRING} } },

            // The callback function handles the SQL execution results
            function(err, result)
            {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                //console.log(result.metaData); // [ { name: 'TEMPLATEID' }, { name: 'SUBJECT' } ]
                // console.log(result.rows);     // [ [ 5051, ' ... ' ] ]
                var bodyhtml = result.rows[0][2];
                var bodytxt = result.rows[0][3];
                //console.log(bodyhtml);
                fs.writeFileSync(''+templateId+'/'+templateId+'.html', bodyhtml);
                fs.writeFileSync(''+templateId+'/'+templateId+'.txt', bodytxt);
                //doRelease(connection);
            }
        );

        connection.execute(
            //"SELECT * FROM GLOBAL_NAME",[],
            //The statement to execute
            "select TEMPLATEID, SUBJECT, BODYHTML, BRANDID, BODYTEXT " +
            "FROM SMTP_NTEMPLATES_BRANDED " +
            "WHERE LANGUAGEID=1033 AND TEMPLATEID = :id",

            // The "bind value" for the "bind variable" :id
            [templateId],

            // Optional execute options argument, such as the query result format
            // or whether to get extra metadata
            // { outFormat: oracledb.OBJECT, extendedMetaData: true },
            { fetchInfo: { "BODYHTML": { type: oracledb.STRING}, "BODYTEXT": { type: oracledb.STRING} } },

            // The callback function handles the SQL execution results
            function(err, result)
            {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                console.log(result.metaData); // [ { name: 'TEMPLATEID' }, { name: 'SUBJECT' } ]
                //console.log(result.rows);     // [ [ 5051, ' ... ' ] ]
                console.log(result.rows.length);
                for(var i=0; i<result.rows.length; i++ ) {
                    var bodyhtml = result.rows[i][2];
                    var bodytxt = result.rows[i][4];
                    var brandId = result.rows[i][3];
                    console.log(brandId);
                    fs.writeFileSync(''+templateId+'/'+ templateId+'-'+brandId+ '.html', bodyhtml);
                    fs.writeFileSync(''+templateId+'/'+ templateId+'-'+brandId+ '.txt', bodytxt);
                }
                //doRelease(connection);
            }
        );
    });

// Note: connections should always be released when not needed
function doRelease(connection)
{
    connection.close(
        function(err) {
            if (err) {
                console.error(err.message);
            }
        });
}
