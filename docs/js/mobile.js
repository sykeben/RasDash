const minWidth = 815;
const screenWidth = window.innerWidth;
const errorModal = $('#sizeError');

// If the screen is really small, show an error.
window.onload = function() {
    if (screenWidth < minWidth) errorModal.modal('show');
};