chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';
  const color = prevState === 'ON' ? 'black' : 'red';

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });
  await chrome.action.setBadgeBackgroundColor({ color: color });
  if (nextState === "ON") {
    msg = `starting focus mode on tab ${tab.id}`
    console.log(msg)
    // Insert the CSS file when the user turns the extension on
    await chrome.scripting.insertCSS({
      files: ["focus.css"],
      target: { tabId: tab.id },
    });
  }
  // else (nextState === "OFF") {
  //   msg = `ending focus mode on tab ${tab.id}`
  //   console.log()
  //   // Remove the CSS file when the user turns the extension off
  //   await chrome.scripting.removeCSS({
  //     files: ["focus.css"],
  //     target: { tabId: tab.id },
  //   });
  // };
});
