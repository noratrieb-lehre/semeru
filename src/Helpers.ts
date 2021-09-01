export function formatTime(time: number): string {
    time = time / 1000;
    const seconds = time % 60;
    let minutes = time / 60;
    let hours = 0;
    if (minutes > 60) {
        hours = minutes / 60;
        minutes = minutes % 60;
    }

    return (
        `${Math.floor(hours).toString().padStart(2, "0")}:` +
        `${Math.floor(minutes).toString().padStart(2, "0")}:` +
        `${Math.floor(seconds).toString().padStart(2, "0")}`
    );
}

export function formatTimeText(time: number) {
    time = time / 1000;
    const seconds = time % 60;
    let minutes = time / 60;
    let hours = 0;
    if (minutes > 60) {
        hours = minutes / 60;
        minutes = minutes % 60;
    }

    return (
        `${Math.floor(hours)}h ` +
        `${Math.floor(minutes)}min ` +
        `${Math.floor(seconds)}s`
    );
}
