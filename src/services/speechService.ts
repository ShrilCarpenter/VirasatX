// Web Speech API text-to-speech & speech recognition service

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  lang?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onError?: (err: unknown) => void;
}

// SpeechRecognition type for cross-browser support
type SpeechRecognitionType = typeof window extends { SpeechRecognition: infer T } ? T : unknown;

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private recognition: any = null;
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private isListeningActive: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, options: SpeechOptions = {}) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      options.onEnd?.();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Pick best available voice (Prefer Indian English / Hindi / Natural voices)
    const voices = this.synth.getVoices();
    const targetLang = options.lang || 'en-IN';

    const preferredVoice =
      voices.find(v => v.lang === targetLang || v.lang.includes('IN') || v.lang.includes('hi-IN')) ||
      voices.find(v => v.name.includes('India') || v.name.includes('Hindi') || v.name.includes('Natural')) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = options.rate || 0.95;
    utterance.pitch = options.pitch || 1.0;
    utterance.lang = targetLang;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      options.onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      options.onError?.(e);
    };

    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  public resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
    }
  }

  /**
   * Start speech recognition (voice input).
   * Uses the Web Speech Recognition API with cross-browser support.
   */
  public startListening(
    onResult: (transcript: string) => void,
    onError?: (error?: unknown) => void
  ) {
    if (typeof window === 'undefined') {
      onError?.('Not in browser environment');
      return;
    }

    // Cross-browser SpeechRecognition
    const SpeechRecognitionAPI =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      console.warn('Speech Recognition is not supported in this browser.');
      onError?.('Speech Recognition not supported');
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        this.isListeningActive = false;
        if (transcript) {
          onResult(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        this.isListeningActive = false;
        console.warn('Speech recognition error:', event?.error);
        onError?.(event?.error);
      };

      recognition.onend = () => {
        this.isListeningActive = false;
      };

      this.recognition = recognition;
      this.isListeningActive = true;
      recognition.start();
    } catch (e) {
      console.warn('Speech recognition failed to start:', e);
      onError?.(e);
    }
  }

  /** Stop speech recognition */
  public stopListening() {
    if (this.recognition && this.isListeningActive) {
      try {
        (this.recognition as unknown as { stop: () => void }).stop();
      } catch {
        // Already stopped
      }
      this.isListeningActive = false;
      this.recognition = null;
    }
  }

  public getStatus() {
    return {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      isListening: this.isListeningActive,
      ttsSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
      sttSupported: typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window),
    };
  }
}

export const speechService = new SpeechService();
