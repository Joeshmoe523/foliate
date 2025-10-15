import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dropdown", "dropdownButton"]

  connect() {
    this.initializeDropdowns()
  }

  disconnect() {
    this.cleanupDropdowns()
  }

  initializeDropdowns() {
    // Initialize Flowbite dropdowns
    if (window.Dropdown) {
      // Initialize the main dropdown
      const dropdownElement = document.getElementById('dropdownRight')
      const dropdownButton = document.getElementById('dropdownRightButton')
      
      if (dropdownElement && dropdownButton) {
        this.dropdown = new window.Dropdown(dropdownElement, dropdownButton, {
          placement: 'right-end',
          offsetDistance: 16,
          triggerType: 'hover',
          delay: 200
        })
      }

      // Initialize popovers
      const popoverElement = document.getElementById('popover-home')
      const popoverButton = document.querySelector('[data-popover-target="popover-home"]')
      
      if (popoverElement && popoverButton) {
        this.popover = new window.Popover(popoverElement, popoverButton, {
          placement: 'right',
          offset: 15
        })
      }
    }
  }

  cleanupDropdowns() {
    // Clean up existing instances
    if (this.dropdown) {
      this.dropdown.destroy()
      this.dropdown = null
    }
    
    if (this.popover) {
      this.popover.destroy()
      this.popover = null
    }
  }

  // Re-initialize after Turbo navigation
  turboConnect() {
    this.cleanupDropdowns()
    setTimeout(() => {
      this.initializeDropdowns()
    }, 100)
  }

  // Handle visibility changes
  turboDisconnect() {
    this.cleanupDropdowns()
  }
}
