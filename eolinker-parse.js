var jqScript = document.createElement('script');
jqScript.src = "https://cdn.bootcss.com/jquery/2.0.3/jquery.min.js";
document.body.appendChild(jqScript);
jqScript.onload = function() {
    var tableName = $('.background-group-li.elem-active .group-name').text();

    var table = $('list-require-common-component table')[0];


    let fields = [];
    $(table).find('tr').toArray().forEach((tr, trIndex) => {
        if (trIndex == 0) return;
        let field = { key: '', type: '' };
        $(tr).find('td').toArray().forEach((td, i) => {
            if (i == 2) {
                field.key = td.innerText;

            }
            if (i == 4) {
                switch (td.innerText) {
                    case "varchar":
                        field.type = "String"
                        break;
                    case "int":
                        field.type = "Integer";
                        break;
                    case "decimal":
                        field.type = "BigDecimal";
                        break;
                    case "datetime":
                        field.type = "Date";
                        break;

                }

            }

        })
        fields.push(field)

    })
    console.group(`解析Table : ${tableName}`, fields);

    console.groupEnd();
    console.group(`生成Java Entity模板语法:`, )
    console.log(`
class ${tableName[0].toUpperCase()+tableName.substring(1)}{
        ${fields.map(field=>'        '+field.key+':'+field.type+';' ).join('\n       ')}

        }
    `)

    console.groupEnd()
    console.group(`生成Typescript 接口`);
    fields.forEach(field => {
        switch (field.type) {
            case 'String':
                field.tsType = 'string';
                break;
            case 'BigDecimal':
            case 'Integer':
                field.tsType = 'number';
                break;
            case 'Date':
                field.tsType = 'Date';
                break;

        }
    })
    console.log(`
interface  I${tableName[0].toUpperCase()+tableName.substring(1)}{
        ${fields.map(field=>'        '+field.key+'?:'+field.tsType+';' ).join('\n       ')}

        }
    `)

}