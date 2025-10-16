import { Controller } from "@hotwired/stimulus"
import { Editor } from 'https://esm.sh/@tiptap/core@2.6.6';
import StarterKit from 'https://esm.sh/@tiptap/starter-kit@2.6.6';
import Underline from 'https://esm.sh/@tiptap/extension-underline@2.6.6';

export default class extends Controller {
  static targets = ["editor", "editorWrapper", "promptSection"]
  static values = {
    targetFieldId: String
  }

  connect() {
    // console.log('Text Editor Controller Connected');
    // console.log('Target Field ID:', this.targetFieldIdValue);
    // console.log('Has Editor Target:', this.hasEditorTarget);
    // console.log('Editor Target:', this.editorTarget);

    if (this.hasEditorTarget) {
      // Get the form and target field
      const form = this.element.closest('form');
      // console.log('Form:', form);
      
      const targetField = form.querySelector(`#${this.targetFieldIdValue}`);
      // console.log('Target Field:', targetField);
      
      if (!targetField) {
        console.error(`Target field with ID ${this.targetFieldIdValue} not found`);
        return;
      }

      // TipTap editor setup
      this.editor = new Editor({
        element: this.editorTarget,
        extensions: [StarterKit, Underline],
        content: targetField.value || '',
        editorProps: {
          attributes: {
            class: 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
          },
        },
        onUpdate: ({ editor }) => {
          // console.log('Editor updated:', editor.getHTML());
          // Update the hidden field with the editor's HTML content
          targetField.value = editor.getHTML();
          // Update submit button state based on content
          this.updateSubmitButtonState(editor);
        }
      });

      // console.log('Editor initialized:', this.editor);

      // Set initial content if there's any
      if (targetField.value) {
        // console.log('Setting initial content:', targetField.value);
        this.editor.commands.setContent(targetField.value);
      }

      // Set up event listeners for toolbar buttons
      this.setupToolbarButtons();
      
      // Set up form submission listener to capture prompt
      this.setupFormSubmissionListener(form);
      
      // Set up submit button state management
      this.setupSubmitButtonState(form);
      
      // Set initial submit button state after editor is ready
      setTimeout(() => {
        this.updateSubmitButtonState(this.editor);
      }, 100);
    }
  }

  setupToolbarButtons() {
    const fieldId = this.targetFieldIdValue;
    // console.log('Setting up toolbar buttons for field:', fieldId);

    // Example: set up event listeners for toolbar buttons
    this.element.querySelector(`#toggleBoldButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('Bold button clicked');
      this.editor.chain().focus().toggleBold().run();
    });
    this.element.querySelector(`#toggleItalicButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('Italic button clicked');
      this.editor.chain().focus().toggleItalic().run();
    });
    this.element.querySelector(`#toggleUnderlineButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('Underline button clicked');
      this.editor.chain().focus().toggleUnderline().run();
    });
    this.element.querySelector(`#toggleListButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('List button clicked');
      this.editor.chain().focus().toggleBulletList().run();
    });
    this.element.querySelector(`#toggleOrderedListButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('Ordered list button clicked');
      this.editor.chain().focus().toggleOrderedList().run();
    });
    this.element.querySelector(`#toggleBlockquoteButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('Blockquote button clicked');
      this.editor.chain().focus().toggleBlockquote().run();
    });
    this.element.querySelector(`#toggleHRButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('HR button clicked');
      this.editor.chain().focus().setHorizontalRule().run();
    });
    this.element.querySelector(`#toggleCodeBlockButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('Code block button clicked');
      this.editor.chain().focus().toggleCodeBlock().run();
    });
    this.element.querySelector(`#toggleUndoButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('Undo button clicked');
      this.editor.chain().focus().undo().run();
    });
    this.element.querySelector(`#toggleRedoButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('Redo button clicked');
      this.editor.chain().focus().redo().run();
    });

    // typography dropdown
    this.hideTypographyDropdown(fieldId);

    this.element.querySelector(`#toggleParagraphButton-${fieldId}`)?.addEventListener('click', () => {
      // console.log('Paragraph button clicked');
      this.editor.chain().focus().setParagraph().run();
      this.hideTypographyDropdown(fieldId);
    });
    
    this.element.querySelectorAll(`[data-heading-level]`).forEach((button) => {
      button.addEventListener('click', () => {
        const level = button.getAttribute('data-heading-level');
        // console.log('Heading button clicked:', level);
        this.editor.chain().focus().toggleHeading({ level: parseInt(level) }).run()
        this.hideTypographyDropdown(fieldId);
      });
    });
  }

  hideTypographyDropdown(fieldId) {
    const dropdownElement = document.getElementById(`typographyDropdown-${fieldId}`);
    const triggerElement = document.getElementById(`typographyDropdownButton-${fieldId}`);
    if (window.Dropdown && dropdownElement && triggerElement) {
      const typographyDropdown = new window.Dropdown(dropdownElement, triggerElement);
      typographyDropdown.hide();
    }
  }

  focusEditor(event) {
    // Only focus if clicking on the wrapper (not if clicking inside the actual editor content)
    if (event.target === this.editorWrapperTarget || event.target === this.editorTarget) {
      if (this.editor) {
        // Focus the editor and move cursor to the end of content
        this.editor.commands.focus('end');
      }
    }
  }

  togglePrompt(event) {
    const isChecked = event.target.checked;
    if (this.hasPromptSectionTarget) {
      if (isChecked) {
        this.promptSectionTarget.style.display = 'block';
      } else {
        this.promptSectionTarget.style.display = 'none';
      }
    }
  }

  setupFormSubmissionListener(form) {
    form.addEventListener('submit', (event) => {
      // Capture the current prompt before form submission
      this.capturePromptText();
      
      // Double-check: if toggle is off, ensure prompt field is empty
      const promptToggle = document.getElementById(`reflection-prompt-toggle-${this.targetFieldIdValue}`);
      if (promptToggle && !promptToggle.checked) {
        const promptField = document.getElementById('prompt_text');
        if (promptField) {
          promptField.value = '';
        }
      }
    });
  }

  setupSubmitButtonState(form) {
    this.submitButton = form.querySelector('input[type="submit"]');
    if (this.submitButton) {
      // Set initial state
      this.updateSubmitButtonState(this.editor);
    }
  }

  updateSubmitButtonState(editor) {
    if (!this.submitButton) return;
    
    const hasContent = editor && editor.getText().trim().length > 0;
    
    if (hasContent) {
      this.submitButton.disabled = false;
      this.submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
      this.submitButton.classList.add('cursor-pointer');
    } else {
      this.submitButton.disabled = true;
      this.submitButton.classList.add('opacity-50', 'cursor-not-allowed');
      this.submitButton.classList.remove('cursor-pointer');
    }
  }

  capturePromptText() {
    const promptField = document.getElementById('prompt_text');
    if (!promptField) return;
    
    // Check if the prompt toggle is enabled
    const promptToggle = document.getElementById(`reflection-prompt-toggle-${this.targetFieldIdValue}`);
    const isPromptEnabled = promptToggle && promptToggle.checked;
    
    if (isPromptEnabled && this.hasPromptSectionTarget) {
      const promptText = this.promptSectionTarget.querySelector('[data-reflection-prompt-target="prompt"]')?.textContent;
      if (promptText) {
        promptField.value = promptText;
      }
    } else {
      // Clear the prompt field if toggle is off
      promptField.value = '';
    }
  }

  disconnect() {
    // console.log('Text Editor Controller Disconnected');
    if (this.editor) {
      this.editor.destroy();
    }
  }
}
