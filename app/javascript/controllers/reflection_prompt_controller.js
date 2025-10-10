import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["prompt"]

  connect() {
    // Sample prompts for testing - these will eventually come from the database
    this.prompts = [
      "What did you learn today?",
      "What are you grateful for today?",
      "What challenge helped you grow today?",
      "What small step can you take tomorrow toward your goals?",
      "How did you take care of yourself today?"
    ]
    
    this.currentIndex = 0
    this.updateDisplay()
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.prompts.length
    this.updateDisplay()
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.prompts.length) % this.prompts.length
    this.updateDisplay()
  }

  updateDisplay() {
    this.promptTarget.textContent = this.prompts[this.currentIndex]
  }
}

