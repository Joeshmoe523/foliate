import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item"]

  connect() {
    // Add this controller to all reflection items
    this.element.setAttribute("data-reflection-target", "item")
    console.log('reflection controller connected')
  }

  select(event) {
    // console.log('select called')
    // Remove active class from all reflection items
    document.querySelectorAll('[data-reflection-target="item"]').forEach(item => {
      item.classList.remove('border-l-2', 'border-blue-400', 'bg-blue-50')
    })

    // Add active class to clicked item
    this.element.classList.add('border-l-2', 'border-blue-400', 'bg-blue-50')
  }
} 