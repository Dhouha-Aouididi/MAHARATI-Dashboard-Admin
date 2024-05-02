// modal-functions.ts
export function openModal(modalId: string): void {
    $(`#${modalId}`).modal('show');
  }
  
  export function closeModal(modalId: string): void {
    $(`#${modalId}`).modal('hide');
  }
  