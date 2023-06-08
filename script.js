// Current Time Function
{
  function updateTime() {
    const clock = document.getElementById("clock");
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;
    clock.textContent = time;
  }
  setInterval(updateTime, 1000);
}

// Clickable Icons (for middle footer section )
{
  const elements = document.getElementsByClassName("toggleElement");

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const image1 = element.querySelector(".image1");
    const image2 = element.querySelector(".image2");
    const pt1 = element.querySelector(".popped-text1");
    const pt2 = element.querySelector(".popped-text2");
    const emojiContainer = document.querySelector("#emoji-space");
    const emojiButton = element.querySelector("#emoji-button");

    element.addEventListener("click", function () {
      if (image1.style.display === "block") {
        image1.style.display = "none";
        image2.style.display = "block";
        pt1.classList.add("popped-text");
        pt2.classList.remove("popped-text");
      } else {
        image1.style.display = "block";
        image2.style.display = "none";
        pt1.classList.remove("popped-text");
        pt2.classList.add("popped-text");
      }
      // For different background color of buttons on click
      if (element.classList.contains("br")) {
        element.classList.toggle("bgr");
      }
      if (element.classList.contains("bb")) {
        element.classList.toggle("bgb");
      }
      //emoji section view
      if (emojiButton.style.display === "block") {
        emojiContainer.style.display = "none";
      } else {
        emojiContainer.style.display = "flex";
      }
    });
  }
}
//profile section width setting dynamically
{
  function setProfileContainerWidth() {
    const pc = document.getElementById("profile-conatiner");
    const windowWidth = window.innerWidth;
    const targetWidth = windowWidth - 300;
    pc.style.width = `${targetWidth}px`;
  }
  // Call setContainerHeight whenever the window is resized
  window.addEventListener("resize", setProfileContainerWidth);
}
// Clickable Icons 2 (for right side footer and aside section)
{
  const elements2 = document.getElementsByClassName("toggleElement2");
  const profileContainer = document.getElementById("profile-conatiner");
  // const profile = document.getElementByClassName("profile");

  // Set initial width of main section to 100%
  profileContainer.style.width = "100%";
  // profile.style.width = "25%";

  for (let i = 0; i < elements2.length; i++) {
    const element = elements2[i];
    const image1 = element.querySelector(".image1");
    const image2 = element.querySelector(".image2");
    const attachedDiv = element.querySelector(".attached-div");
    const closeDiv = element.querySelector(".close-div");

    element.addEventListener("click", function () {
      // Check if the clicked element already has image2 displayed
      const isImage2Visible = image2.style.display === "block";

      // Hide image2 in all elements
      for (let j = 0; j < elements2.length; j++) {
        const el = elements2[j];
        const img2 = el.querySelector(".image2");
        const img1 = el.querySelector(".image1");
        const div = el.querySelector(".attached-div");
        img2.style.display = "none";
        img1.style.display = "block";
        div.classList.remove("visible");
        el.querySelector(".close-div").classList.remove("visible"); // Hide close-div for all elements
      }

      // Show/hide image2 and attached div in the clicked element
      if (!isImage2Visible) {
        image2.style.display = "block";
        image1.style.display = "none";
        attachedDiv.classList.add("visible");
        // attachedDiv.classList.add("slideIn");
        // attachedDiv.classList.remove("slideOut");
        closeDiv.classList.add("visible");

        // profileContainer.style.width = window.innerWidth - 300  + "px"; // Set width to 75%
        setProfileContainerWidth();
        setContainerHeight();
        setChatHeight();
        setHostHeight();
        // profile.style.width = "33%";
      } else {
        image2.style.display = "none";
        image1.style.display = "block";
        attachedDiv.classList.remove("visible");
        // attachedDiv.classList.add("slideOut");
        // attachedDiv.classList.remove("slideIn");
        closeDiv.classList.remove("visible");
        profileContainer.style.width = "100%"; // Set width to 100%
        // profile.style.width = "25%";
      }
    });

    attachedDiv.addEventListener("click", function (event) {
      // Stop the click event from propagating to parent elements
      event.stopPropagation();
    });
  }
}

// Event listener for emoji section visibility change
{
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === "style") {
        setChildDivHeights();
      }
    });
  });

  // Observe changes in the style attribute of the emoji section
  observer.observe(document.querySelector("#emoji-space"), {
    attributes: true,
  });
}
//footer more option
{
  var mo = document.querySelector(".mo");
  var moreOptnPopup = document.querySelector(".more-optn-popup");
  var isViewVisible = false; // Track the visibility of the view class

  mo.addEventListener("click", function () {
    toggleViewClass();
  });

  document.addEventListener("click", function (event) {
    if (!mo.contains(event.target)) {
      moreOptnPopup.classList.remove("view");
      isViewVisible = false;
    }
  });

  function toggleViewClass() {
    if (isViewVisible) {
      moreOptnPopup.classList.remove("view");
    } else {
      moreOptnPopup.classList.add("view");
    }

    isViewVisible = !isViewVisible; // Toggle the visibility flag
  }
}
//add people more option section
{
  var mas = document.querySelectorAll(".ma");
  var mops = document.querySelectorAll(".mop");
  var activeIndex = -1; // Track the index of the active .mop element

  for (var i = 0; i < mas.length; i++) {
    attachClickListener(i);
  }

  document.addEventListener("click", function (event) {
    var clickedInsideMa = false;

    for (var i = 0; i < mas.length; i++) {
      if (mas[i].contains(event.target)) {
        clickedInsideMa = true;
        break;
      }
    }

    if (!clickedInsideMa) {
      deactivateActiveMop();
    }
  });

  function attachClickListener(index) {
    mas[index].addEventListener("click", function () {
      if (activeIndex === index) {
        deactivateActiveMop();
      } else {
        activateMop(index);
      }
    });
  }

  function activateMop(index) {
    if (activeIndex !== -1) {
      mops[activeIndex].classList.remove("view");
    }

    mops[index].classList.add("view");
    activeIndex = index;
  }

  function deactivateActiveMop() {
    if (activeIndex !== -1) {
      mops[activeIndex].classList.remove("view");
      activeIndex = -1;
    }
  }
}

// profile count for show everyone icon setting
{
  // Get the number of .profile elements
  var profileCount = document.querySelectorAll(".profile").length;
  // console.log(profileCount);
  profileCount = profileCount / 2;

  // Update the badge text
  var badgeElement = document.getElementById("profileCountBadge");
  badgeElement.textContent = profileCount.toString();
}
// Profile section height control
{
  function setChildDivHeights() {
    // Get the parent element (profile-container) from id
    var parentDiv = document.getElementById("profile-conatiner");

    // Get the child divs (profiles) from class
    var childDivs = parentDiv.getElementsByClassName("profile");

    // Get the footer element
    var footer = document.querySelector("footer");

    // Get the emoji section (emoji-space) from id
    var emojiDiv = document.getElementById("emoji-space");

    // Calculate the available height for child divs
    var availableHeight =
      document.documentElement.clientHeight -
      (footer.clientHeight + emojiDiv.clientHeight);

    // Calculate the height for each child div
    var childHeight;
    var rows = Math.floor(childDivs.length / 3);
    if (childDivs.length % 3 === 0) {
      childHeight = availableHeight / rows;
    } else {
      childHeight = availableHeight / (rows + 1);
    }

    // Set the height for each child div
    for (var i = 0; i < childDivs.length; i++) {
      childDivs[i].style.height = childHeight - 12 + "px";
    }
  }
  // Initial calculation and setting of child div heights
  setChildDivHeights();
  // Add event listener for the "resize" event, it works every time zoom in or zoom out operation is done
  window.addEventListener("resize", setChildDivHeights);
}

//add people scrollable div height setting dynamically
{
  function setContainerHeight() {
    // console.log("setting height of scrollbale item");
    // Get the required elements
    var attachedDiv = document.querySelector(".aside-box");
    var heading = document.querySelector(".abHead");
    var addPeople = document.querySelector("#add-people");
    var container = document.querySelector(".abCont");

    // Calculate the desired container height
    var containerHeight =
      attachedDiv.offsetHeight -
      (heading.offsetHeight + addPeople.offsetHeight + 40);

    // Set the container height
    container.style.height = containerHeight + "px";
    // console.log(
    //   "attached div " +
    //     attachedDiv.offsetHeight +
    //     " heading " +
    //     heading.offsetHeight +
    //     " add people " +
    //     addPeople.offsetHeight +
    //     " container " +
    //     container.style.height
    // );
  }

  // Call setContainerHeight whenever the window is resized
  window.addEventListener("resize", setContainerHeight);
}

//message people scrollable div height setting dynamically
{
  function setChatHeight() {
    // console.log("setting height of scrollbale item");
    // Get the required elements
    var chatDiv = document.querySelector(".chat-div");
    var chatHead = document.querySelector(".chatHead");
    var chatMsg = document.querySelector(".chatMsg");
    var sendMsg = document.querySelector(".sminp");
    var chats = document.querySelector("#chats");

    // Calculate the desired chats height
    var chatHeight =
      chatDiv.offsetHeight -
      (chatHead.offsetHeight +
        chatMsg.offsetHeight +
        sendMsg.offsetHeight +
        50);

    // Set the chats height
    chats.style.height = chatHeight + "px";
    // console.log(
    //   "attached div " +
    //     chatDiv.offsetHeight +
    //     " chatHead " +
    //     chatHead.offsetHeight +
    //     " add people " +
    //     chatMsg.offsetHeight +
    //     " chats " +
    //     chats.style.height
    // );
  }

  // Call setContainerHeight whenever the window is resized
  window.addEventListener("resize", setChatHeight);
}
//host section scrollable div height setting dynamically
{
  function setHostHeight() {
    // console.log("setting height of scrollbale item");
    // Get the required elements
    var hostDIv = document.querySelector(".hostDIv");
    var hostHead = document.querySelector(".hostHead");
    var hostDesc = document.querySelector(".hostDesc");
    var hostopn = document.querySelector("#hostopn");

    // Calculate the desired hostopn height
    var hostHeight =
      hostDIv.offsetHeight -
      (hostHead.offsetHeight + hostDesc.offsetHeight + 13);

    // Set the hostopn height
    hostopn.style.height = hostHeight + "px";
    // console.log(
    //   "hostDIv " +
    //     hostDIv.offsetHeight +
    //     " hostHead " +
    //     hostHead.offsetHeight +
    //     " hostDesc " +
    //     hostDesc.offsetHeight +
    //     " hostopn " +
    //     hostopn.style.height
    // );
  }

  // Call setContainerHeight whenever the window is resized
  window.addEventListener("resize", setHostHeight);
}
// send symbol in chat section (works while input only)
{
  const messageInput = document.getElementById("message-input");
  const sendIcon = document.getElementById("send-icon");

  messageInput.addEventListener("input", function () {
    if (messageInput.value.trim() !== "") {
      sendIcon.classList.add("inpSltd");
    } else {
      sendIcon.classList.remove("inpSltd");
    }
  });
}
