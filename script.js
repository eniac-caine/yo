function playMusic() {
  const music = document.getElementById("background-music");
  if (music) {
    music.play().catch((error) => {
      console.error("Error playing music:", error);
    });
  } else {
    console.error("Music element not found!");
  }
}

// Keep the existing DOMContentLoaded event for confetti and slide animation
window.addEventListener("DOMContentLoaded", function () {
  confetti();
  _slideSatu();
});

// Keep the click event as a fallback, but make it more reliable
document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("background-music");
  document.body.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch((error) => {
        console.error("Error playing music:", error);
      });
    }
  });
});

const _slideSatu = function () {
  const slideSatu = document.getElementById("slideSatu");
  slideSatu.classList.remove("d-none");

  // Add a delay before transitioning to the second slide
  setTimeout(function () {
    slideSatu.classList.replace("animate__slideInDown", "animate__backOutDown");
    setTimeout(function () {
      slideSatu.classList.add("d-none");
      _slideDua(); // Transition to the second slide
    }, 1000);
  }, 5000); // Adjusted delay for the first slide
};

const _slideDua = function () {
  const slideDua = document.getElementById("slideDua");
  slideDua.classList.remove("d-none");

  // 🎵 Start music after 3 seconds of Slide Two appearing
  setTimeout(() => {
    playMusic();
  }, 3000);

  // Start typing animation
  new TypeIt("#teks1", {
    strings: [
      "On this very, very special day,\
      I hope the world showers you with all the happiness, love, joy, and health — every bit you've ever wished for and manifested.\
      You're an incredible person who brings light, love, and happiness wherever you go.\
      Today is just another reminder of how truly amazing you are.\
      Congratulations on a colorful 21, baby!\
      Wishing you a charming  22 and even brighter days ahead.\
      Have an absolutely wonderful birthday!\
      A very, very Happy Birthday to you!!!",
    ],
    startDelay: 4000, // Delay before typing starts
    speed: 75,
    waitUntilVisible: true,
    cursor: true,
    lifeLike: true,
    afterComplete: function () {
      // After typing completes
      setTimeout(() => {
        slideDua.classList.replace(
          "animate__zoomInDown",
          "animate__fadeOutLeft"
        );
        setTimeout(() => {
          slideDua.remove();
          _slideLima(); // Transition to slideLima directly
        }, 1000);
      }, 2000);
    },
  }).go();
};

const _slideLima = function () {
  const slideLima = document.getElementById("slideLima");
  const trims = document.getElementById("trims");

  slideLima.classList.remove("d-none");

  setTimeout(() => {
    trims.classList.remove("d-none");
  }, 1000);

  slideLima.addEventListener("animationend", () => {
    slideLima.classList.add("animate__delay-3s");
    slideLima.classList.replace("animate__bounceIn", "animate__fadeOut");
    trims.classList.add(
      "animate__animated",
      "animate__fadeOut",
      "animate__delay-3s"
    );
    setTimeout(() => {
      trims.remove();
      setTimeout(() => {
        slideLima.remove();
        // Show the carousel after all animations
        document.getElementById("carousel-section").classList.remove("d-none");
      }, 1000);
    }, 6000);
  });
};

function getRandomPosition(element) {
  var x = document.body.offsetHeight - element.clientHeight;
  var y = document.body.offsetWidth - element.clientWidth;
  var randomX = Math.floor(Math.random() * 500);
  var randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
}

const _slideEmpat = function () {
  const slideEmpat = document.getElementById("slideEmpat");
  const btn = document.getElementsByTagName("button");
  slideEmpat.classList.remove("d-none");

  btn[0].addEventListener("click", function () {
    var xy = getRandomPosition(slideEmpat);
    slideEmpat.style.top = xy[0] + "px";
  });

  btn[1].addEventListener("click", function () {
    slideEmpat.classList.replace("animate__fadeInDown", "animate__bounceOut");
    slideEmpat.classList.remove("animate__delay-2s");
    setTimeout(function () {
      slideEmpat.remove();
      setTimeout(() => {
        _slideLima();
      }, 500);
    }, 1000);
  });
};

const _slideEnam = function () {
  const slideEnam = document.getElementById("slideEnam");
  slideEnam.classList.remove("d-none");
};

// Update the TypeIt for "I love you" to use gold color
new TypeIt("#trims", {
  strings: ["I love You !!!"],
  startDelay: 2000,
  speed: 150,
  loop: false,
  waitUntilVisible: true,
}).go();

// Add CSS for gold color to the trims element
document.addEventListener("DOMContentLoaded", function () {
  const trimsElement = document.getElementById("trims");
  if (trimsElement) {
    trimsElement.style.color = "gold";
    trimsElement.style.textShadow = "0 0 10px rgba(255, 215, 0, 0.5)";
    trimsElement.style.fontWeight = "bold";
  }
});

("use strict");

var onlyOnKonami = false;

function confetti() {
  // Globals
  var $window = $(window),
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confetti = [];

  var runFor = 2000;
  var isRunning = true;

  setTimeout(() => {
    isRunning = false;
  }, runFor);

  // Settings
  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    pointer = 0;

  var particles = 150,
    spread = 20,
    sizeMin = 5,
    sizeMax = 12 - sizeMin,
    eccentricity = 10,
    deviation = 100,
    dxThetaMin = -0.1,
    dxThetaMax = -dxThetaMin - dxThetaMin,
    dyMin = 0.13,
    dyMax = 0.18,
    dThetaMin = 0.4,
    dThetaMax = 0.7 - dThetaMin;

  var colorThemes = [
    function () {
      return color(
        (200 * random()) | 0,
        (200 * random()) | 0,
        (200 * random()) | 0
      );
    },
    function () {
      var black = (200 * random()) | 0;
      return color(200, black, black);
    },
    function () {
      var black = (200 * random()) | 0;
      return color(black, 200, black);
    },
    function () {
      var black = (200 * random()) | 0;
      return color(black, black, 200);
    },
    function () {
      return color(200, 100, (200 * random()) | 0);
    },
    function () {
      return color((200 * random()) | 0, 200, 200);
    },
    function () {
      var black = (256 * random()) | 0;
      return color(black, black, black);
    },
    function () {
      return colorThemes[random() < 0.5 ? 1 : 2]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 3 : 5]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 2 : 4]();
    },
  ];

  function color(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  // Cosine interpolation
  function interpolation(a, b, t) {
    return ((1 - cos(PI * t)) / 2) * (b - a) + a;
  }

  // Create a 1D Maximal Poisson Disc over [0, 1]
  var radius = 1 / eccentricity,
    radius2 = radius + radius;

  function createPoisson() {
    // domain is the set of points which are still available to pick from
    // D = union{ [d_i, d_i+1] | i is even }
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];
    while (measure) {
      var dart = measure * random(),
        i,
        l,
        interval,
        a,
        b,
        c,
        d;

      // Find where dart lies
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        (a = domain[i]), (b = domain[i + 1]), (interval = b - a);
        if (dart < measure + interval) {
          spline.push((dart += a - measure));
          break;
        }
        measure += interval;
      }
      (c = dart - radius), (d = dart + radius);

      for (i = domain.length - 1; i > 0; i -= 2) {
        (l = i - 1), (a = domain[l]), (b = domain[i]);
        // c---d          c---d  Do nothing
        //   c-----d  c-----d    Move interior
        //   c--------------d    Delete interval
        //         c--d          Split interval
        //       a------b
        if (a >= c && a < d)
          if (b > d) domain[l] = d; // Move interior (Left case)
          else domain.splice(l, 2);
        // Delete interval
        else if (a < c && b > c)
          if (b <= d) domain[i] = c; // Move interior (Right case)
          else domain.splice(i, 0, c, d); // Split interval
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  var container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "0";
  container.style.overflow = "visible";
  container.style.zIndex = "9999";

  // Confetto constructor
  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement("div");
    this.inner = document.createElement("div");
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.position = "absolute";
    outerStyle.width = sizeMin + sizeMax * random() + "px";
    outerStyle.height = sizeMin + sizeMax * random() + "px";
    innerStyle.width = "100%";
    innerStyle.height = "100%";
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = "50px";
    outerStyle.transform = "rotate(" + 360 * random() + "deg)";
    this.axis =
      "rotate3D(" + cos(360 * random()) + "," + cos(360 * random()) + ",0,";
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + "deg)";

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + "px";
    outerStyle.top = this.y + "px";

    // Create the periodic spline
    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      // Compute spline and convert to polar
      var phi = (this.frame % 7777) / 7777,
        i = 0,
        j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + "px";
      outerStyle.top = this.y + rho * sin(phi) + "px";
      innerStyle.transform = this.axis + this.theta + "deg)";
      return this.y > height + deviation;
    };
  }

  function poof() {
    if (!frame) {
      // Append the container
      document.body.appendChild(container);

      // Add confetti

      var theme =
          colorThemes[onlyOnKonami ? (colorThemes.length * random()) | 0 : 0],
        count = 0;

      (function addConfetto() {
        if (onlyOnKonami && ++count > particles) return (timer = undefined);

        if (isRunning) {
          var confetto = new Confetto(theme);
          confetti.push(confetto);

          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        }
      })(0);

      // Start the loop
      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return (frame = requestAnimationFrame(loop));

        // Cleanup
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  $window.keydown(function (event) {
    pointer =
      konami[pointer] === event.which
        ? pointer + 1
        : +(event.which === konami[0]);
    if (pointer === konami.length) {
      pointer = 0;
      poof();
    }
  });

  if (!onlyOnKonami) poof();
}

/*--------------------
Vars
--------------------*/
let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02;
const speedDrag = -0.1;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll(".carousel-item");
const $cursors = document.querySelectorAll(".cursor");

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);
};

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

// Add auto-advance for carousel
document.addEventListener("DOMContentLoaded", function () {
  // Auto-advance carousel when it becomes visible
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.target.id === "carousel-section" &&
        !mutation.target.classList.contains("d-none")
      ) {
        console.log("Carousel visible, starting auto-advance");
        startCarouselAutoAdvance();
        observer.disconnect();
      }
    });
  });

  function startCarouselAutoAdvance() {
    let carouselInterval = setInterval(() => {
      progress += 2;
      if (progress > 100) {
        clearInterval(carouselInterval);
      }
      animate();
    }, 3000);
  }

  const carouselSection = document.getElementById("carousel-section");
  if (carouselSection) {
    observer.observe(carouselSection, { attributes: true });
  }
});

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

/*--------------------
Handlers
--------------------*/
const handleWheel = (e) => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

const handleMouseMove = (e) => {
  if (e.type === "mousemove") {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

// Function to display Pinterest layout with proper animations
function displayPinterestLayout() {
  const pinterestLayout = document.getElementById("pinterest-layout");
  const items = pinterestLayout.querySelectorAll(".pinterest-item img");

  pinterestLayout.classList.remove("d-none");

  // Set index for staggered animation
  items.forEach((item, index) => {
    item.style.setProperty("--index", index);
    setTimeout(() => {
      item.classList.add("animate__fadeIn");

      // Add faded effect after animation
      setTimeout(() => {
        item.classList.add("faded");
      }, 1500 + index * 200);
    }, 100 * index);
  });

  // Proceed to next slide after all animations
  const totalDuration = items.length * 200 + 2000;
  setTimeout(() => {
    // Fade out the entire pinterest-layout
    pinterestLayout.classList.add("animate__animated", "animate__fadeOut");

    // After the fade out animation, proceed to the next slide
    setTimeout(() => {
      pinterestLayout.classList.add("d-none");
      _slideLima();
    }, 1000); // Duration of fade out animation
  }, totalDuration);
}

window.addEventListener("DOMContentLoaded", function () {
  const startOverlay = document.getElementById("start-overlay");
  const startButton = document.getElementById("start-button");

  // Add click event listener to the start button
  startButton.addEventListener("click", () => {
    playMusic(); // Start the music
    startOverlay.remove(); // Remove the overlay
    confetti(); // Start confetti
    _slideSatu(); // Start the program flow
  });
});
