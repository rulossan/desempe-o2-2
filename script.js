document.addEventListener('DOMContentLoaded', () => {
    const FormularioBen = document.getElementById('FormularioBen');
    const tabla = document.getElementById('tabla');
    const filtroBtn = document.getElementById('filtroBtn');

    let beneficiarios = JSON.parse(localStorage.getItem('beneficiarios')) || [];

    const VistaBeneficiarios = (MostrarBeneficiarios) => {
        tabla.innerHTML = '';
        MostrarBeneficiarios.forEach(({ Nombre, Años, Ingresos, familia }) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${Nombre}</td>
                <td>${Años}</td>
                <td>${Ingresos}</td>
                <td>${familia}</td>
            `;
            tabla.appendChild(row);
        });
    };


    VistaBeneficiarios(beneficiarios);

    FormularioBen.addEventListener('submit', (e) => {
        e.preventDefault();

        const Nombre = e.target.Nombre.value;
        const Años = parseInt(e.target.Años.value);
        const Ingresos = parseFloat(e.target.Ingresos.value);
        const familia = parseInt(e.target.familia.value);

        const nuevoBeneficiario = { Nombre, Años, Ingresos, familia };

        beneficiarios.push(nuevoBeneficiario);

        // Guardar en localStorage
        localStorage.setItem('beneficiarios', JSON.stringify(beneficiarios));

        VistaBeneficiarios(beneficiarios);

        FormularioBen.reset();


    });

    filtroBtn.addEventListener('click', () => {
        const filtroBen = beneficiarios.filter(({ Ingresos }) => Ingresos < 200);
        VistaBeneficiarios(filtroBen);
    });
});
