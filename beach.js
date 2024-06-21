/*Start BackgroundMusic*/
document.addEventListener('DOMContentLoaded', function() {
  var audioPlayer = document.getElementById('audioPlayer');
  var playButton = document.getElementById('playButton');

  playButton.style.display = 'none';

  function startAudio() {
    audioPlayer.play().then(function() {
      console.log('Wiedergabe automatisch gestartet');
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
    }).catch(function(error) {
      console.log('Wiedergabe konnte nicht automatisch gestartet werden: ', error);
      playButton.style.display = 'block';
    });
  }

  audioPlayer.addEventListener('play', function() {
    playButton.style.display = 'none';
  });

  audioPlayer.addEventListener('pause', function() {
    playButton.style.display = 'block';
  });

  console.log('Audio-Element geladen:', audioPlayer);

  // Media Query für mobile Geräte
  const mediaQuery = window.matchMedia('(max-width: 720px)');

  if (mediaQuery.matches) {
    // Touch-Event für mobile Geräte
    document.addEventListener('touchstart', startAudio);
  } else {
    // Click-Event für Desktop-Geräte
    document.addEventListener('click', startAudio);
  }

  playButton.addEventListener('click', function() {
    audioPlayer.play().catch(function(error) {
      console.log('Wiedergabe konnte nicht gestartet werden: ', error);
      playButton.style.display = 'block';
    });
  });
});
/*End BackgroundMusic*/

/*Start section three*/
document.addEventListener("DOMContentLoaded", function() {
  var timerElement = document.getElementById("timer");
  var timerButton = document.getElementById("timerButton");
  var startTime;
  var timerInterval;
  var countdownDuration = 10 * 60 * 1000;
  var customAlert = document.getElementById("customAlert");
  var closeAlert = document.getElementById("closeAlert");

  function startTimer() {
    startTime = Date.now() + countdownDuration;
    updateTimer();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    var remainingTime = startTime - Date.now();
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "00:00:00";
      showAlert();
      return;
    }

    var hours = Math.floor(remainingTime / (1000 * 60 * 60));
    var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    timerElement.textContent = 
      (hours < 10 ? "0" + hours : hours) + ":" +
      (minutes < 10 ? "0" + minutes : minutes) + ":" +
      (seconds < 10 ? "0" + seconds : seconds);
  }

  startTimer();

  timerButton.addEventListener('click', function() {
    startTimer();
  });

  function showAlert() {
    customAlert.style.display = "block";
  }

  closeAlert.addEventListener("click", function() {
    customAlert.style.display = "none";
  });
  
});
/*End section three*/


/*Start section four*/
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode ? 'dark' : 'light');

  const beachImage = document.getElementById('beach');
  if (isDarkMode) {
      beachImage.src = 'Images/beachDarkmode.png';
  } else {
      beachImage.src = 'Images/beach.png';
  }
}

const sunglassImage = document.getElementById('sunglass');

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const savedMode = localStorage.getItem('darkMode');
  const beachImage = document.getElementById('beach');

  if (savedMode === 'dark') {
      body.classList.add('dark-mode');
      beachImage.src = 'Images/beachDarkmode.png';
      
  } else {
      body.classList.remove('dark-mode','Images/beach.png');
  }
});
/*End section four*/

/*Start section five*/
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input[name="slider"]');
  const body = document.body;

  let startX = null;
  let currentX = null;

  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    if (!startX) {
      return;
    }
    currentX = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    if (startX && currentX) {
      const diff = startX - currentX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swiped left
          toggleClass('next');
        } else {
          // Swiped right
          toggleClass('prev');
        }
      }
    }
    startX = null;
    currentX = null;
  }

  function toggleClass(direction) {
    const activeInput = document.querySelector('input[name="slider"]:checked');
    const currentIndex = Array.from(inputs).indexOf(activeInput);

    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % inputs.length;
      inputs[nextIndex].checked = true;
    } else if (direction === 'prev') {
      const prevIndex = (currentIndex - 1 + inputs.length) % inputs.length;
      inputs[prevIndex].checked = true;
    }

    body.classList.toggle('blue');
  }

  // Listen for changes by clicking on radio buttons
  inputs.forEach(input => {
    input.addEventListener('change', function() {
      body.classList.toggle('blue');
    });
  });

  // Listen for touch events for swipe gestures
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  document.addEventListener('touchend', handleTouchEnd, false);
});

document.addEventListener('DOMContentLoaded', function() {
  const arrowLeft = document.getElementById('arrowleft');
  const arrowRight = document.getElementById('arrowright');

  function handleResize() {
    // Überprüfen Sie die Bildschirmbreite und zeigen Sie die Pfeile nur auf Desktop an
    if (window.innerWidth >= 720) {
      arrowLeft.style.display = 'block';
      arrowRight.style.display = 'block';
    } else {
      arrowLeft.style.display = 'none';
      arrowRight.style.display = 'none';
    }
  }

  // Initial ausführen und bei Änderungen der Bildschirmgröße aktualisieren
  handleResize();
  window.addEventListener('resize', handleResize);
});
/*End section five*/

/*Start section six*/
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('audio');
  const playPauseButton = document.querySelector('.play-pause');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  let isPlaying = false;
  let currentTrackIndex = 0;

const tracks = [
  { title: 'Sunset Vibes',  file: 'Music/sunset-vibes-198338.mp3' },
  { title: 'Beach Dance', file: 'Music/reggaeton-major-beach-dancing-pop-123411.mp3' },
  { title: 'Summer Pop',  file: 'Music/summer-pop-dance-10406.mp3' },
  { title: 'Modern Latin',  file: 'Music/modern-reggaeton-pop-type-beat-caviar-210829.mp3' },
  { title: 'Sun Dream',  file: 'Music/strange-dream-110824.mp3' },
];

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.file;
  document.querySelector('.title').textContent = track.title;
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
  updatePlayPauseButton();
}

function updatePlayPauseButton() {
  const icon = isPlaying ? 'pause' : 'play';
  playPauseButton.innerHTML = `<i class="fa fa-${icon}"></i>`;
}

function playTrack(index) {
  currentTrackIndex = index;
  loadTrack(currentTrackIndex);
  audio.play();
  isPlaying = true;
  updatePlayPauseButton();
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  updatePlayPauseButton();
}

playPauseButton.addEventListener('click', togglePlay);

audio.addEventListener('ended', () => {
  isPlaying = false;
  updatePlayPauseButton();
});

prevButton.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  playTrack(currentTrackIndex);
});

nextButton.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  playTrack(currentTrackIndex);
});

loadTrack(currentTrackIndex);
});
/*End section six*/


/*Start section seven*/
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const slideWidth = document.querySelector('.slide').clientWidth;
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function showSlide(index) {
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % 3; // 3 is the number of slides
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + 3) % 3; // 3 is the number of slides
    showSlide(currentIndex);
  }

  const nextButton = document.querySelector('.next2');
  const prevButton = document.querySelector('.prev2');

  // Media Query für mobile Geräte
  const mediaQuery = window.matchMedia('(max-width: 720px)');
  if (mediaQuery.matches) {
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';

    slides.addEventListener('touchstart', touchStart);
    slides.addEventListener('touchend', touchEnd);
  } else {
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
  }

  function touchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function touchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  }

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) { // Swipe nach links
      nextSlide();
    } else if (touchEndX - touchStartX > 50) { // Swipe nach rechts
      prevSlide();
    }
  }

  showSlide(currentIndex); // Initial Slide anzeigen
});
/*End section seven*/


/*Start section eight*/
document.addEventListener('DOMContentLoaded',() =>{
  const openPopupButton = document.querySelector('.openPopup');
  const popup = document.getElementById('popup');
  const closeButton = document.querySelector('.close');

  openPopupButton.addEventListener('click', () => {
    popup.style.display = 'flex';
    console.log("geöffnet");
  });

  closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });
  
  window.addEventListener('click', (event) => {
    if(event.target === popup){
      popup.style.display = 'none';
    }
  });
})
/*End section eight*/
