window.onload = function () {
    const RECORDID = getParameterURL('record_id');
    if (RECORDID) {
        getInformationRecord(RECORDID);
    } else {
        setStyleNone();
    }
};

///-------Style NONE (ERROR)
function setStyleNone({
    title = "Registro No Validado",
    description = "El registro no se pudo validar, no se encuentra en la base de datos",
    folio = "N/A",
    date = "N/A",
    client = "N/A",
    status = "N/A",
    responsible = "N/A"
} = {}) {

    const icon = document.querySelector('.check-icon');
    if (icon) {
        icon.classList.remove('fa-circle-check');
        icon.classList.add('fa-circle-xmark');
    }

    document.body.classList.remove('state-success');
    document.body.classList.add('state-error');

    setTexts({ title, description, folio, date, client, status, responsible });
}


///-------Style SUCCESS
function setStyleSuccess({
    title = "Registro Válido",
    description = "El registro ha sido verificado correctamente",
    folio = "",
    date = "",
    client = "",
    status = "",
    responsible = ""
} = {}) {

    const icon = document.querySelector('.check-icon');
    if (icon) {
        icon.classList.remove('fa-circle-xmark');
        icon.classList.add('fa-circle-check');
    }

    document.body.classList.remove('state-error');
    document.body.classList.add('state-success');

    setTexts({ title, description, folio, date, client, status, responsible });
}


///-------Helper reutilizable
function setTexts({
    title,
    description,
    folio,
    date,
    client,
    status,
    responsible
}) {
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText('textTitle', title);
    setText('textDescription', description);
    setText('textFolio', folio);
    setText('textDate', date);
    setText('textClient', client);
    setText('textStatus', status);
    setText('textResponsible', responsible);
}

///-------Information
function getInformationRecord(idRecord) {
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: 128252,
            option: 'get_information',
            id_record: idRecord,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const data = res?.responsible?.data;
        if (data && Object.keys(data).length > 0) {
            setStyleSuccess({
                folio: data.folio || '',
                date: data.date || '',
                client: data.client || '',
                status: data.status || '',
                responsible: data.responsible || ''
            });
        } else {
            setStyleNone();
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        setStyleNone({
            description: "Ocurrió un error al consultar la información"
        });
    });
}