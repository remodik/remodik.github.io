document.addEventListener("DOMContentLoaded", function () {
    const chance = 0.3;

    function openFullscreenVideo() {
        const video = document.createElement("video");
        video.src = "video.mp4";
        video.autoplay = true;
        video.muted = true;
        video.loop = false;
        video.controls = false;
        video.style.position = "fixed";
        video.style.top = "0";
        video.style.left = "0";
        video.style.width = "100vw";
        video.style.height = "100vh";
        video.style.objectFit = "cover";
        video.style.zIndex = "9999";

        document.body.appendChild(video);

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }

        setTimeout(() => {
            video.muted = false;
            video.play().catch(error => console.error("Ошибка воспроизведения:", error));
        }, 100);

        video.addEventListener("click", function () {
            video.pause();
            video.remove();
        });
    }

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function (event) {
            if (Math.random() < chance) {
                event.preventDefault();
                event.stopPropagation();
                openFullscreenVideo();
            }
        }, true);
    });
});