document.getElementById('copyButton').addEventListener('click', function() {
    // Select the text
    const affiliateLinkInput = document.querySelector('.affiliate-link input');
    affiliateLinkInput.select();
    affiliateLinkInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text
    document.execCommand('copy');
});
