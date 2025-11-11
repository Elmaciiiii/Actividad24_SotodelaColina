async function generateReport() {
    // Mostrar indicador de carga
    const container = document.getElementById("reportContainer");
    container.innerHTML = '<div class="loading">Generando PDF...</div>';

    try {
        // Validar formulario antes de generar PDF
        if (!validateForm()) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">📋 Completa el formulario correctamente para generar el PDF.</p>';
            return;
        }

        const { jsPDF } = window.jsPdf || window.jspdf;
        
        // Obtener datos del formulario
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const age = document.getElementById("age").value;
        const course = document.getElementById("course").value;
        const subject = document.getElementById("subject").value;
        const project = document.getElementById("project").value;
        const dni = document.getElementById("dni").value;
        const projectDescription = document.getElementById("projectDescription").value;

        // Crear nuevo documento PDF
        const doc = new jsPDF();
        
        // Configurar colores
        const primaryColor = [102, 126, 234];
        const secondaryColor = [118, 75, 162];
        const textColor = [51, 51, 51];

        // Header del documento
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.text("INFORME ESTUDIANTIL", 105, 18, { align: 'center' });
        
        doc.setFontSize(11);
        doc.text('EEST N°1 "Eduardo Ader" - Vicente Lopez', 105, 27, { align: 'center' });
        doc.text(`Fecha: ${new Date().toLocaleDateString('es-AR')}`, 105, 34, { align: 'center' });

        // Linea decorativa
        doc.setDrawColor(...secondaryColor);
        doc.setLineWidth(2);
        doc.line(20, 45, 190, 45);

        // Informacion personal
        doc.setTextColor(...textColor);
        doc.setFontSize(16);
        doc.text("INFORMACION PERSONAL", 20, 60);

        doc.setFontSize(11);
        let yPos = 75;

        doc.text(`Nombre Completo: ${name}`, 25, yPos);
        yPos += 8;
        doc.text(`Correo Electronico: ${email}`, 25, yPos);
        yPos += 8;

        if (age) {
            doc.text(`Edad: ${age} anos`, 25, yPos);
            yPos += 8;
        }

        if (course) {
            doc.text(`Curso: ${course}`, 25, yPos);
            yPos += 8;
        }

        if (dni) {
            doc.text(`DNI: ${dni}`, 25, yPos);
            yPos += 8;
        }

        // Informacion academica
        yPos += 10;
        doc.setFontSize(16);
        doc.text("INFORMACION ACADEMICA", 20, yPos);
        yPos += 15;

        doc.setFontSize(11);

        doc.text(`Materia: ${subject}`, 25, yPos);
        yPos += 8;

        doc.text(`Proyecto Final: ${project}`, 25, yPos);
        yPos += 8;

        // Determinar ciclo y modalidad según el curso
        const courseNumber = parseInt(course.charAt(0));
        
        if (courseNumber >= 1 && courseNumber <= 3) {
            // Ciclo Básico
            doc.text("Ciclo: Basico", 25, yPos);
        } else if (courseNumber >= 4 && courseNumber <= 7) {
            // Ciclo Superior
            doc.text("Ciclo: Superior", 25, yPos);
            yPos += 8;
            
            // Determinar modalidad según curso específico
            const programmingCourses = ["4° 4° División", "5° 3° División", "6° 3° División", "7° 2° División"];
            if (programmingCourses.includes(course)) {
                doc.text("Modalidad: Tecnica en Programacion", 25, yPos);
            } else {
                doc.text("Modalidad: Tecnica en Electronica", 25, yPos);
            }
        }

        // Descripcion del proyecto
        yPos += 15;
        doc.setFontSize(16);
        doc.text("DESCRIPCION DEL PROYECTO", 20, yPos);
        yPos += 15;

        doc.setFontSize(11);
        
        // Dividir texto largo en lineas
        const splitText = doc.splitTextToSize(projectDescription, 160);
        doc.text(splitText, 25, yPos);

        // Footer
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 270, 210, 27, 'F');
        
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(9);
        doc.text("Este documento fue generado automaticamente", 105, 282, { align: 'center' });
        doc.text("EEST N°1 'Eduardo Ader' - Vicente Lopez", 105, 290, { align: 'center' });

        // Generar vista previa
        const pdfDataUri = doc.output("datauristring");
        
        // Mostrar PDF en el contenedor
        container.innerHTML = `
            <iframe width="100%" height="500px" src="${pdfDataUri}"></iframe>
            <button class="btn" style="margin-top: 15px;" onclick="downloadPDF()">
                📥 Descargar PDF
            </button>
        `;

        // Mostrar modal de éxito
        showSuccessModal();

        // Guardar el PDF para descarga
        window.currentPDF = doc;

    } catch (error) {
        console.error("Error generando PDF:", error);
        container.innerHTML = `
            <p style="text-align: center; color: #dc3545; padding: 40px;">
                ❌ Error al generar el PDF. Verifica que todos los campos estén completos correctamente.
            </p>
        `;
    }
}

function downloadPDF() {
    if (window.currentPDF) {
        const name = document.getElementById("name").value || "estudiante";
        const filename = `informe_${name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.pdf`;
        window.currentPDF.save(filename);
    }
}

function validateForm() {
    let isValid = true;

    // Validar nombre
    const name = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    
    if (!name.value.trim()) {
        showError(name, nameError, "El nombre es obligatorio");
        isValid = false;
    } else if (!nameRegex.test(name.value)) {
        showError(name, nameError, "El nombre solo puede contener letras y espacios");
        isValid = false;
    } else {
        showSuccess(name, nameError);
    }

    // Validar email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.value.trim()) {
        showError(email, emailError, "El correo electrónico es obligatorio");
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, emailError, "Ingresa un correo electrónico válido (ejemplo@gmail.com)");
        isValid = false;
    } else {
        showSuccess(email, emailError);
    }

    // Validar edad (ahora obligatoria)
    const age = document.getElementById("age");
    const ageError = document.getElementById("ageError");
    
    if (!age.value) {
        showError(age, ageError, "La edad es obligatoria");
        isValid = false;
    } else if (age.value < 11 || age.value > 20) {
        showError(age, ageError, "La edad debe estar entre 11 y 20 años");
        isValid = false;
    } else {
        showSuccess(age, ageError);
    }

    // Validar curso
    const course = document.getElementById("course");
    const courseError = document.getElementById("courseError");
    
    if (!course.value) {
        showError(course, courseError, "Debes seleccionar un curso");
        isValid = false;
    } else {
        showSuccess(course, courseError);
    }

    // Validar materia
    const subject = document.getElementById("subject");
    const subjectError = document.getElementById("subjectError");
    
    if (!subject.value.trim()) {
        showError(subject, subjectError, "La materia es obligatoria");
        isValid = false;
    } else {
        showSuccess(subject, subjectError);
    }

    // Validar proyecto
    const project = document.getElementById("project");
    const projectError = document.getElementById("projectError");
    
    if (!project.value.trim()) {
        showError(project, projectError, "El proyecto final es obligatorio");
        isValid = false;
    } else {
        showSuccess(project, projectError);
    }

    // Validar descripción del proyecto
    const projectDescription = document.getElementById("projectDescription");
    const projectDescriptionError = document.getElementById("projectDescriptionError");
    
    if (!projectDescription.value.trim()) {
        showError(projectDescription, projectDescriptionError, "La descripción del proyecto es obligatoria");
        isValid = false;
    } else {
        showSuccess(projectDescription, projectDescriptionError);
    }

    // Validar DNI (ahora obligatorio)
    const dni = document.getElementById("dni");
    const dniError = document.getElementById("dniError");
    
    if (!dni.value) {
        showError(dni, dniError, "El DNI es obligatorio");
        isValid = false;
    } else if (dni.value.length !== 8) {
        showError(dni, dniError, "El DNI debe tener exactamente 8 números");
        isValid = false;
    } else {
        showSuccess(dni, dniError);
    }

    return isValid;
}

function showError(input, errorElement, message) {
    input.classList.add("input-error");
    input.classList.remove("input-success");
    errorElement.textContent = message;
    errorElement.classList.add("show");
}

function showSuccess(input, errorElement) {
    input.classList.remove("input-error");
    input.classList.add("input-success");
    errorElement.classList.remove("show");
}

function showSuccessModal() {
    const modal = document.getElementById("successModal");
    modal.style.display = "block";
    
    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
        closeModal();
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById("successModal");
    modal.style.display = "none";
}

// Cerrar modal si se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById("successModal");
    if (event.target === modal) {
        closeModal();
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all the elements
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletModal = document.getElementById('walletModal');
    const connectMetaMaskBtn = document.getElementById('connectMetaMask');
    const disconnectWalletBtn = document.getElementById('disconnectWallet');
    const walletAddress = document.getElementById('walletAddress');
    const connectedAddress = document.getElementById('connectedAddress');
    const closeModal = document.querySelector('.close');
    let metaMaskDefaultHTML = connectMetaMaskBtn ? connectMetaMaskBtn.innerHTML : '';

    // Check if wallet is already connected
    function checkWalletConnection() {
        const savedAddress = localStorage.getItem('walletAddress');
        if (savedAddress) {
            updateWalletUI(savedAddress);
        }
    }

    // Format wallet address with ellipsis in the middle
    function formatAddress(address) {
        if (!address) return '';
        if (address.length <= 10) return address;
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    // Simulate MetaMask connection
    async function connectWallet() {
        // In a real app, this would connect to MetaMask using ethers.js or web3.js
        // For simulation, we'll use a fake address and format it
        const fakeAddress = '0xA12F1234567890ABCDEF1234567890ABCDEF34B8';
        const formattedAddress = formatAddress(fakeAddress);
        
        // Simulate network delay
        return new Promise(resolve => {
            setTimeout(() => {
                localStorage.setItem('walletAddress', fakeAddress);
                resolve(formattedAddress);
            }, 1000);
        });
    }

    // Update UI when wallet is connected
    function updateWalletUI(address) {
        if (!connectWalletBtn || !walletAddress) return;
        
        // Update button and show address
        connectWalletBtn.textContent = '👛 Conectada';
        walletAddress.textContent = formatAddress(address);
        walletAddress.style.display = 'block';
        
        // Update modal to show connected state
        const walletOptions = document.querySelector('.wallet-options');
        const walletConnected = document.getElementById('walletConnected');
        
        if (walletOptions && walletConnected) {
            walletOptions.style.display = 'none';
            walletConnected.style.display = 'block';
            if (connectedAddress) {
                const fullAddress = localStorage.getItem('walletAddress') || address;
                const shortAddr = formatAddress(fullAddress);
                connectedAddress.textContent = shortAddr;
                if (connectedAddress.removeAttribute) connectedAddress.removeAttribute('title');
            }
        }
        
        // Close modal after a short delay
        if (walletModal) {
            setTimeout(() => {
                walletModal.style.display = 'none';
            }, 1500);
        }
    }
    
    // Disconnect wallet
    function disconnectWallet() {
        localStorage.removeItem('walletAddress');
        if (connectWalletBtn) {
            connectWalletBtn.textContent = '🔗 Conectar Wallet';
            connectWalletBtn.disabled = false;
        }
        if (walletAddress) walletAddress.style.display = 'none';
        
        const walletOptions = document.querySelector('.wallet-options');
        const walletConnected = document.getElementById('walletConnected');
        
        if (walletOptions) walletOptions.style.display = 'flex';
        if (walletConnected) walletConnected.style.display = 'none';
        if (connectMetaMaskBtn) {
            connectMetaMaskBtn.disabled = false;
            connectMetaMaskBtn.innerHTML = metaMaskDefaultHTML || '<img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask"><span>MetaMask</span>';
        }
        if (walletModal) walletModal.style.display = 'none';
    }

    // Add event listeners only if elements exist
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', () => {
            const walletOptions = document.querySelector('.wallet-options');
            const walletConnected = document.getElementById('walletConnected');
            const savedAddress = localStorage.getItem('walletAddress');

            // Reset modal state on open
            if (connectMetaMaskBtn) {
                connectMetaMaskBtn.disabled = false;
                connectMetaMaskBtn.innerHTML = metaMaskDefaultHTML || '<img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask"><span>MetaMask</span>';
            }

            if (savedAddress) {
                if (walletOptions) walletOptions.style.display = 'none';
                if (walletConnected) {
                    walletConnected.style.display = 'block';
                    if (connectedAddress) {
                        connectedAddress.textContent = savedAddress;
                        connectedAddress.title = savedAddress;
                    }
                }
            } else {
                if (walletOptions) walletOptions.style.display = 'flex';
                if (walletConnected) walletConnected.style.display = 'none';
            }

            if (walletModal) walletModal.style.display = 'flex';
        });
    }

    if (connectMetaMaskBtn) {
        connectMetaMaskBtn.addEventListener('click', async () => {
            try {
                connectMetaMaskBtn.disabled = true;
                connectMetaMaskBtn.innerHTML = '<span>Conectando...</span>';
                
                const address = await connectWallet();
                updateWalletUI(address);
            } catch (error) {
                console.error('Error connecting wallet:', error);
                if (connectMetaMaskBtn) {
                    connectMetaMaskBtn.disabled = false;
                    connectMetaMaskBtn.innerHTML = metaMaskDefaultHTML || '<img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask"><span>MetaMask</span>';
                }
                alert('Error al conectar la billetera. Por favor, inténtalo de nuevo.');
            }
        });
    }

    if (disconnectWalletBtn) {
        disconnectWalletBtn.addEventListener('click', disconnectWallet);
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (walletModal) walletModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === walletModal) {
            walletModal.style.display = 'none';
        }
    });

    // Check for wallet connection on page load
    checkWalletConnection();
});

// Validaciones en tiempo real y blur para todos los campos
// Nombre
const nameInput = document.getElementById("name");
nameInput.addEventListener("input", function(e) {
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    const nameError = document.getElementById("nameError");
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!this.value.trim()) {
        showError(this, nameError, "El nombre es obligatorio");
    } else if (!nameRegex.test(this.value)) {
        showError(this, nameError, "El nombre solo puede contener letras y espacios");
    } else {
        showSuccess(this, nameError);
    }
});
nameInput.addEventListener("blur", function() {
    const nameError = document.getElementById("nameError");
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!this.value.trim()) {
        showError(this, nameError, "El nombre es obligatorio");
    } else if (!nameRegex.test(this.value)) {
        showError(this, nameError, "El nombre solo puede contener letras y espacios");
    } else {
        showSuccess(this, nameError);
    }
});

// Correo
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", function() {
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.value.trim()) {
        showError(this, emailError, "El correo electrónico es obligatorio");
    } else if (!emailRegex.test(this.value)) {
        showError(this, emailError, "Ingresa un correo electrónico válido");
    } else {
        showSuccess(this, emailError);
    }
});
emailInput.addEventListener("blur", function() {
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.value.trim()) {
        showError(this, emailError, "El correo electrónico es obligatorio");
    } else if (!emailRegex.test(this.value)) {
        showError(this, emailError, "Ingresa un correo electrónico válido");
    } else {
        showSuccess(this, emailError);
    }
});

// Edad
const ageInput = document.getElementById("age");
ageInput.addEventListener("input", function(e) {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 2);
    const ageError = document.getElementById("ageError");
    if (!this.value) {
        showError(this, ageError, "La edad es obligatoria");
    } else if (this.value < 11 || this.value > 20) {
        showError(this, ageError, "La edad debe estar entre 11 y 20 años");
    } else {
        showSuccess(this, ageError);
    }
});
ageInput.addEventListener("blur", function() {
    const ageError = document.getElementById("ageError");
    if (!this.value) {
        showError(this, ageError, "La edad es obligatoria");
    } else if (this.value < 11 || this.value > 20) {
        showError(this, ageError, "La edad debe estar entre 11 y 20 años");
    } else {
        showSuccess(this, ageError);
    }
});

// Curso
const courseInput = document.getElementById("course");
courseInput.addEventListener("change", function() {
    const courseError = document.getElementById("courseError");
    if (!this.value) {
        showError(this, courseError, "Debes seleccionar un curso");
    } else {
        showSuccess(this, courseError);
    }
});
courseInput.addEventListener("blur", function() {
    const courseError = document.getElementById("courseError");
    if (!this.value) {
        showError(this, courseError, "Debes seleccionar un curso");
    } else {
        showSuccess(this, courseError);
    }
});

// Materia
const subjectInput = document.getElementById("subject");
subjectInput.addEventListener("input", function() {
    const subjectError = document.getElementById("subjectError");
    if (!this.value.trim()) {
        showError(this, subjectError, "La materia es obligatoria");
    } else {
        showSuccess(this, subjectError);
    }
});
subjectInput.addEventListener("blur", function() {
    const subjectError = document.getElementById("subjectError");
    if (!this.value.trim()) {
        showError(this, subjectError, "La materia es obligatoria");
    } else {
        showSuccess(this, subjectError);
    }
});

// Proyecto
const projectInput = document.getElementById("project");
projectInput.addEventListener("input", function() {
    const projectError = document.getElementById("projectError");
    if (!this.value.trim()) {
        showError(this, projectError, "El proyecto final es obligatorio");
    } else {
        showSuccess(this, projectError);
    }
});
projectInput.addEventListener("blur", function() {
    const projectError = document.getElementById("projectError");
    if (!this.value.trim()) {
        showError(this, projectError, "El proyecto final es obligatorio");
    } else {
        showSuccess(this, projectError);
    }
});

// Descripción del proyecto
const projectDescriptionInput = document.getElementById("projectDescription");
projectDescriptionInput.addEventListener("input", function() {
    const projectDescriptionError = document.getElementById("projectDescriptionError");
    if (!this.value.trim()) {
        showError(this, projectDescriptionError, "La descripción del proyecto es obligatoria");
    } else {
        showSuccess(this, projectDescriptionError);
    }
});
projectDescriptionInput.addEventListener("blur", function() {
    const projectDescriptionError = document.getElementById("projectDescriptionError");
    if (!this.value.trim()) {
        showError(this, projectDescriptionError, "La descripción del proyecto es obligatoria");
    } else {
        showSuccess(this, projectDescriptionError);
    }
});

// DNI
const dniInput = document.getElementById("dni");
dniInput.addEventListener("input", function(e) {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 8);
    const dniError = document.getElementById("dniError");
    if (!this.value) {
        showError(this, dniError, "El DNI es obligatorio");
    } else if (this.value.length !== 8) {
        showError(this, dniError, "El DNI debe tener exactamente 8 números");
    } else {
        showSuccess(this, dniError);
    }
});
dniInput.addEventListener("blur", function() {
    const dniError = document.getElementById("dniError");
    if (!this.value) {
        showError(this, dniError, "El DNI es obligatorio");
    } else if (this.value.length !== 8) {
        showError(this, dniError, "El DNI debe tener exactamente 8 números");
    } else {
        showSuccess(this, dniError);
    }
}); 