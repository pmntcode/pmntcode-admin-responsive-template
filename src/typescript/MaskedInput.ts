class MaskedInput {
    private inputElement: HTMLInputElement;
    private maskPattern: string;

    constructor(inputElement: HTMLInputElement, maskPattern: string) {
        this.inputElement = inputElement;
        this.maskPattern = maskPattern;
        this.setupListeners();
    }

    private setupListeners(): void {
        this.inputElement.addEventListener('input', this.handleInput.bind(this));
        this.inputElement.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Backspace') {
            this.inputElement.value = this.inputElement.value.slice(0, -1);
            event.preventDefault();
        }
    }

    private handleInput(): void {
        const unmaskedValue = this.inputElement.value.replace(/[^\d]/g, '');
        let maskedValue = '';

        let unmaskedIndex = 0;
        for (let i = 0; i < this.maskPattern.length; i++) {
            const patternChar = this.maskPattern[i];
            if (patternChar === '#') {
                if (unmaskedIndex < unmaskedValue.length) {
                    maskedValue += unmaskedValue[unmaskedIndex++];
                } else {
                    break;
                }
            } else {
                maskedValue += patternChar;
            }
        }

        this.inputElement.value = maskedValue;
    }
}
