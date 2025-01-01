// Update the time based on local timezone
    function updateTime() {
      const now = new Date();

      // Get the time in the local timezone and format it
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formattedTime = now.toLocaleString('en-US', options);
      const [time, timeSubText] = formattedTime.split(' '); // Split time and AM/PM
      const [hour, minute] = time.split(':'); // Get hour and minute

      // Get the current day, month, and year
      const dayText = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

      // Update the time and day text in the card
      document.getElementById('time').textContent = `${hour}:${minute}:${now.getSeconds().toString().padStart(2, '0')}`;
      document.getElementById('time-sub-text').textContent = timeSubText;
      document.getElementById('day-text').textContent = dayText;

      // Apply night theme (no sunny theme anymore)
      const card = document.getElementById('timeCard');
      card.classList.add('night-theme');
    }

    // Call the updateTime function when the page loads
    window.onload = updateTime;
    setInterval(updateTime, 1000); // Update time every second for real-time effect