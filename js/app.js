$(document).ready(function (){

    var formNoticias = $("#form-noticias");
    formNoticias.on("submit", function(){
        try {
            var json = recordFromForm(formNoticias);
            saveData(json);
            addDataTable(json);
        } catch (e){
            console.error(e);
        }
        return false;
    });

    function recordFromForm(form){
        var inputs = form.find('input[type="text"], textarea');
        var json = "";
        inputs.each(function(idx, input){
            var name = $(input).attr("name");
            var value = $(input).val();
            if (json !== "")
                json += ",";
            
            json += `"${name}": "${ value.trim() }"`;
            console.log(json);
        });
        json = `{${json}}`;
        return JSON.parse(json);
    }

    function addDataTable(noticiajson){
        var tbody = $("#table-noticias tbody");
        var tr = $("<tr></tr>");
        var tdTitulo = $("<td></td>");
        var tdIntroducao = $("<td></td>");
        var tdAcoes = $("<td></td>");
        tdTitulo.text(noticiajson['titulo']);
        tdIntroducao.text(noticiajson['introducao']);

        var remover = $('<a></a>');
        remover.text("Remover");
        remover.addClass("btn btn-sm btn-danger");
        tdAcoes.append(remover);

        remover.click(function(){
            tr.remove();
            showRowCount();
        });

        tr.append(tdTitulo, tdIntroducao, tdAcoes);
        tbody.append(tr);

        showRowCount();
    }

    function showRowCount(){
        var total = $("#table-noticias tbody tr").length;

        $("#table-noticias tfoot tr td span").text(total);
    }

    const STORAGE_NAME = "news";
    const saveData = (record) => {
        let data = loadData();
        data.push(record);
        data = JSON.stringify(data);
        localStorage.setItem(STORAGE_NAME, data);
    };

    const loadData = () => {
        let data = localStorage.getItem(STORAGE_NAME);
        if(!data)
            data = [];
        else
            data = JSON.parse(data)
        return data;
    };

    const loadTable = () =>{
        let data = loadData();
        for (json of data){
            addDataTable(json);
        }
    }

    loadTable();
});
