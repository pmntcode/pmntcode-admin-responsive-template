class CustomFileInput {
    private fileInput: HTMLInputElement;
    private fileNamesDiv: HTMLDivElement;

    constructor(inputId: string, namesDivId: string) {
        this.fileInput = document.getElementById(inputId) as HTMLInputElement;
        this.fileNamesDiv = document.getElementById(namesDivId) as HTMLDivElement;

        this.fileInput.addEventListener('change', () => this.handleFileChange());
    }

    private handleFileChange(): void {
        const files = this.fileInput.files;
        if (files) {
            this.fileNamesDiv.innerHTML = '';
            for (let i = 0; i < files.length; i++) {
                const fileName = files[i].name;
                const fileDiv = document.createElement('div');
                fileDiv.classList.add('file-item');

                const fileNameSpan = document.createElement('span');
                fileNameSpan.textContent = fileName;

                const removeButton = document.createElement('button');
                removeButton.innerHTML = '<i class="pmntcode-icon pmntcode-icon--delete"></i>';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', () => this.removeFile(fileDiv));

                fileDiv.appendChild(fileNameSpan);
                fileDiv.appendChild(removeButton);
                this.fileNamesDiv.appendChild(fileDiv);
            }
        }
    }

    private removeFile(fileDiv: HTMLDivElement): void {
        fileDiv.remove();
    }
}