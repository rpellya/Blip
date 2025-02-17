import Handlebars from 'handlebars';
import template from './Input.hbs';
import { Component } from 'shared/lib/Component';
import './Input.scss';

interface InputProps {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    value?: string;
    error?: string;
}

export class Input extends Component<InputProps> {
    protected events(): Array<[string, EventListener]> {
        return [];
    }

    private inputElement: HTMLInputElement | null = null;

    constructor(props: InputProps) {
        super('div', props);
    }

    setProps(props: Partial<InputProps>): void {
        this.props = { ...this.props, ...props };
        this.render();
    }

    render(): string {
        return Handlebars.compile(template)(this.props);
    }

    mount(parent: HTMLElement): void {
        this.inputElement = parent.querySelector(
            `input[name="${this.props.name}"]`,
        );
        if (this.inputElement) {
            this.inputElement.addEventListener('input', this.handleInput);
        }
    }

    private handleInput = (e: Event): void => {
        const target = e.target as HTMLInputElement;
        this.setProps({ value: target.value });
    };

    destroy(): void {
        if (this.inputElement) {
            this.inputElement.removeEventListener('input', this.handleInput);
            this.inputElement = null;
        }
    }
}
