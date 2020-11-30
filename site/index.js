

$("[class*=circle]").on("click", function() {
    // $(this).addClass("grow-over");
    // setTimeout(() => {
    let text = $(this).children().text().toLowerCase();
    if (text == "home")
        text = "";
    window.location.href = `/${text}`;
    // }, 1800);
});

$(() => {
    //
    // Create stars
    //
    const NUM_STARS = 100;
    const NUM_SHOOTING_STARS = 4;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.style.position = "absolute";
    svg.style.left = 0;
    svg.style.top = 0;

    svg.setAttribute("viewbox", `0 0 1 1`);
    svg.setAttribute('preserveaspectratio', `xMinYMin slice`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    for (let i = 0; i < NUM_STARS; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const r = Math.random() + 1;

        const delay = i*100 + 500*Math.random();
        const duration = 3000 + 4000*Math.random();
        const brightness = 0.7 + 0.3*Math.random();

        const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        star.setAttribute("r", r);
        star.setAttribute("fill", "white");
        star.setAttribute("cx", `${x}%`);
        star.setAttribute("cy", `${y}%`);
        star.setAttribute("transform-origin", `${x}% ${y}%`);

        star.style.setProperty("--star-animation-delay", `${delay}ms`);
        star.style.setProperty("--star-brightness", `${brightness}`);
        star.style.setProperty("--star-animation-duration", `${duration}ms`);
        star.style.setProperty("--star-animation-glow-duration", "1000ms");

        star.classList.add("star");

        svg.appendChild(star);
    }


    for (let i = 0; i < NUM_SHOOTING_STARS; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const tx = Math.random() * 100;
        const ty = Math.random() * 100;
        const r = Math.random() + 1;

        const delay = i*1000 + 5000*Math.random();
        const duration = 3000 + 4000*Math.random();
        const brightness = 0.7 + 0.3*Math.random();

        const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        star.setAttribute("r", r);
        star.setAttribute("fill", "white");
        star.setAttribute("cx", `${x}%`);
        star.setAttribute("cy", `${y}%`);
        star.setAttribute("transform-origin", `${x}% ${y}%`);

        star.style.setProperty("--star-target-dx", `${tx - x}%`);
        star.style.setProperty("--star-target-dy", `${ty - y}%`);

        star.style.setProperty("--star-animation-delay", `${delay}ms`);
        star.style.setProperty("--star-brightness", `${brightness}`);
        star.style.setProperty("--star-animation-duration", `${duration}ms`);
        star.style.setProperty("--star-animation-glow-duration", `${duration}ms`);


        star.classList.add("shooting__star");

        svg.appendChild(star);
    }

    document.body.prepend(svg);
});