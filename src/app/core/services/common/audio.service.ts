import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    private musica = new Audio('assets/sounds/jazz-ruleta.mp3');

    constructor() {
        this.musica.loop = true;
        this.musica.volume = 0.5;
    }

    private habilitado = true;

    play() {
        if (!this.habilitado) return;
        this.musica.play();
    }

    toggle() {
        this.habilitado = !this.habilitado;
        if (this.habilitado) { this.play(); }
        else { this.stop(); }
    }

    pause() {
        this.musica.pause();
    }

    stop() {
        this.musica.pause();
        this.musica.currentTime = 0;
    }

    setVolume(valor: number) {
        this.musica.volume = valor;
    }

    get enabled(): boolean {
        return this.habilitado;
    }
}