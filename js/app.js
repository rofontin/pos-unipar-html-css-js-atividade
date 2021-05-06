
$(document).ready(() => {

    const exemplosArray = () => {

        let array = [10, 7, 20, 5];
        console.log("array " + array);

        let total = array.reduce((x, value) => x += value);
        console.log("reduce " + total);

        let mult = (value) => value * 2;

        var arrayMap = array.map(mult);
        console.log("arrayMap " + arrayMap);

        var arrayFilter = array.filter((value) => value % 2 == 0);
        console.log("arrayFilter " + arrayFilter);

        const pares = (value) => value % 2 == 0;

        console.log("direto " + array.filter(pares).map(mult));
    }

    exemplosArray();

    var formNoticias = $("#form-noticias");
    formNoticias.on("submit", () => {
        try {
            var json = recordFromForm(formNoticias);
            saveRecord(json);
            addDataTable(json);
        } catch (e) {
            console.error(e);
        }
        return false;
    });

    const recordFromForm = (form) => {
        var inputs = form.find('input[type="text"], textarea');
        var json = "";
        inputs.each(function (idx, input) {
            var name = $(input).attr("name");
            var value = $(input).val();
            if (json !== "")
                json += ",";

            json += `"${name}": "${value.trim()}"`;
        });
        json = `{${json}}`;
        return JSON.parse(json);
    }

    const addDataTable = (noticiajson) => {
        var tbody = $("#table-noticias tbody");
        var tr = $("<tr></tr>");
        var tdTitulo = $("<td></td>");
        var tdIntroducao = $("<td></td>");
        var tdAcoes = $("<td></td>");
        tdTitulo.text(noticiajson['titulo']);
        tdIntroducao.text(noticiajson['introducao']);

        var remover = $('<a></a>');
        remover.html('<i class="bi-trash"></i> Remover');
        remover.addClass("btn btn-sm btn-danger");
        tdAcoes.append(remover);

        remover.on("click", () => removeRow(tr));

        tr.append(tdTitulo, tdIntroducao, tdAcoes);
        tbody.append(tr);

        showRowCount();
    }

    const removeRow = (tr) => {
        let idx = tr.index();

        tr.remove();
        showRowCount();

        let data = loadData();
        if (data.length > 0) {
            data.splice(idx, 1);
            saveData(data);
        }
    }

    const showRowCount = () => $("#table-noticias tfoot tr td span").text(countRow());

    const countRow = () => $("#table-noticias tbody tr").length;

    const STORAGE_NAME = "news";

    const saveRecord = (record) => {
        let data = loadData();
        data.push(record);
        saveData(data);
    }

    const saveData = (data) => {
        data = JSON.stringify(data);
        localStorage.setItem(STORAGE_NAME, data);
    }

    const loadData = () => {
        let data = localStorage.getItem(STORAGE_NAME);
        if (!data)
            data = []
        else
            data = JSON.parse(data);
        return data;
    }

    const loadTable = () => {
        let data = loadData();
        for (json of data) {
            addDataTable(json);
        }
    }

    loadTable();
});
