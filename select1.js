
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

        var templateId = 10506;

        fs.mkdirSync('/scripts/'+templateId);

        connection.execute(
            //"SELECT * FROM GLOBAL_NAME",[],
            //The statement to execute
            "select TEMPLATEID, SUBJECT, BODYHTML " +
            "FROM SMTP_NTEMPLATES " +
            "WHERE LANGUAGEID=1033 AND TEMPLATEID = :id",

            // The "bind value" for the "bind variable" :id
            [templateId],

            // Optional execute options argument, such as the query result format
            // or whether to get extra metadata
            // { outFormat: oracledb.OBJECT, extendedMetaData: true },
            { fetchInfo: { "BODYHTML": { type: oracledb.STRING} } },

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
                //console.log(bodyhtml);
                fs.writeFileSync('/scripts/'+templateId+'/'+templateId+'.html', bodyhtml)
                //doRelease(connection);
            }
        );

        connection.execute(
            //"SELECT * FROM GLOBAL_NAME",[],
            //The statement to execute
            "select TEMPLATEID, SUBJECT, BODYHTML, BRANDID " +
            "FROM SMTP_NTEMPLATES_BRANDED " +
            "WHERE LANGUAGEID=1033 AND TEMPLATEID = :id",

            // The "bind value" for the "bind variable" :id
            [templateId],

            // Optional execute options argument, such as the query result format
            // or whether to get extra metadata
            // { outFormat: oracledb.OBJECT, extendedMetaData: true },
            { fetchInfo: { "BODYHTML": { type: oracledb.STRING} } },

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
                    var brandId = result.rows[i][3];
                    console.log(brandId);
                    fs.writeFileSync('/scripts/'+templateId+'/'+ templateId+'-'+brandId+ '.html', bodyhtml)
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
