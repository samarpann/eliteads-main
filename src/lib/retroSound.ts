// Retro 8-bit sound effects using Web Audio API
class RetroSoundManager {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.3;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  // Classic 8-bit click sound
  playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(this.volume * 0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  }

  // Hover sound - softer blip
  playHover() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.03);

    gainNode.gain.setValueAtTime(this.volume * 0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.03);
  }

  // Success/confirm sound - ascending tone
  playSuccess() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    
    notes.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

      gainNode.gain.setValueAtTime(0, ctx.currentTime + index * 0.08);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.4, ctx.currentTime + index * 0.08 + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + index * 0.08 + 0.1);

      oscillator.start(ctx.currentTime + index * 0.08);
      oscillator.stop(ctx.currentTime + index * 0.08 + 0.1);
    });
  }

  // Error sound - descending buzz
  playError() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);

    gainNode.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  }

  // Power up sound
  playPowerUp() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
    gainNode.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }

  // Coin/collect sound
  playCoin() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator1.type = 'square';
    oscillator2.type = 'square';
    
    oscillator1.frequency.setValueAtTime(988, ctx.currentTime); // B5
    oscillator2.frequency.setValueAtTime(1319, ctx.currentTime + 0.05); // E6

    gainNode.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    oscillator1.start(ctx.currentTime);
    oscillator1.stop(ctx.currentTime + 0.05);
    oscillator2.start(ctx.currentTime + 0.05);
    oscillator2.stop(ctx.currentTime + 0.15);
  }

  // Navigation/scroll sound
  playNav() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(440, ctx.currentTime);
    oscillator.frequency.setValueAtTime(550, ctx.currentTime + 0.02);

    gainNode.gain.setValueAtTime(this.volume * 0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.06);
  }

  // Toggle sound
  playToggle(on: boolean) {
    if (this.isMuted && on) return; // Allow sound when unmuting
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'square';
    if (on) {
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.05);
    } else {
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.setValueAtTime(400, ctx.currentTime + 0.05);
    }

    gainNode.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
  }

  // Start/intro jingle
  playIntro() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    
    const notes = [
      { freq: 392, time: 0 },      // G4
      { freq: 523.25, time: 0.1 }, // C5
      { freq: 659.25, time: 0.2 }, // E5
      { freq: 783.99, time: 0.3 }, // G5
    ];

    notes.forEach(({ freq, time }) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + time);

      gainNode.gain.setValueAtTime(0, ctx.currentTime + time);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, ctx.currentTime + time + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.15);

      oscillator.start(ctx.currentTime + time);
      oscillator.stop(ctx.currentTime + time + 0.15);
    });
  }
}

// Singleton instance
export const retroSound = new RetroSoundManager();

// React hook for sound effects
import { useState, useEffect, useCallback } from 'react';

export const useRetroSound = () => {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('retroSoundMuted');
      return saved === 'true';
    }
    return false;
  });

  useEffect(() => {
    retroSound.setMuted(isMuted);
    localStorage.setItem('retroSoundMuted', String(isMuted));
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    retroSound.playToggle(!newMuted);
  }, [isMuted]);

  return {
    isMuted,
    toggleMute,
    playClick: () => retroSound.playClick(),
    playHover: () => retroSound.playHover(),
    playSuccess: () => retroSound.playSuccess(),
    playError: () => retroSound.playError(),
    playPowerUp: () => retroSound.playPowerUp(),
    playCoin: () => retroSound.playCoin(),
    playNav: () => retroSound.playNav(),
    playIntro: () => retroSound.playIntro(),
  };
};

export default retroSound;
