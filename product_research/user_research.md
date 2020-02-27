# User Research

We prepared an [interactive Figma prototype](https://www.figma.com/proto/6wfrnVvzzn7WX4f2umMbU8/Main-2?node-id=39%3A149&viewport=1263%2C271%2C0.5770346522331238&scaling=scale-down) to test the user experience with two potential customers of our product. We began by asking if they're okay with the study being recorded, then introduced the study with the following script:

> Thank you for participating in this user research study. The purpose of the study is for us to validate and improve the interface of our product. Note that we are testing the product, not you, and there are no mistakes or incorrect answers. I’ll discuss a scenario, then you’ll be asked to complete a short series of tasks. While doing this, please “think aloud” with all comments and ask any questions that come to mind. Do you have any questions before we begin?

In this study we focused on users who are looking for on-demand licensing for a one-time event. User 1 is a festival planer for a festival in the in the USA. Music and dancing is always present at these festivals. User 2 is a flautist who frequently performs concerts.

## User Scenario

[Link to Figma prototype](https://www.figma.com/proto/6wfrnVvzzn7WX4f2umMbU8/Main-2?node-id=39%3A149&viewport=1263%2C271%2C0.5770346522331238&scaling=scale-down)

> In this scenario, you are planning a festival(concert). There will be music played at the event, thus you are required to get a music performance license. Normally, you would go to the ASCAP website for this, but in this scenario, you’ll use our website to obtain the license. Please complete the following tasks:
> 1.	Login
> 2.	Create a new license
> 3.	Pay the license fee
> 4.	Print the license certificate

## Post Scenario Questions
*	>Was any step difficult to complete?
    * User 1: No
    * User 2: Printing the certificate.
*	>What was confusing about the interface?
    * User 1: Nothing
    * User 2: The certificate printing was hidden behind another screen and it wasn't obvious how to get there.
*	>Do you have any suggestions as we move forward?
    * User 1: A place for users to specify an "Other" type of event if they don't see exactly what they're looking for.
    * User 2: Make it clearer how to print the certificate.

### User 1 Overview
User 1 easily completed tasks 1-3. Upon logging-in, they immediately located the "My Licenses" section on the sidebar. Following this, they used the "New License" button in the sidebar dropdown instead of the button above the license list.

After going through the (pre-filled) license questionnaire and validating their answers, they created then paid for the license. They couldn't identify the button to go to the license certificate screen, required for step 4. Instead they clicked the non-sidebar "New License" button.

After returning to the list of licenses, User 1 discovered that items in the list were interactive and quickly finished step 4 to complete the study.

### User 2 Overview
User 2 was hesitant about whether to click "Sign-in" or "Register" on the first screen. (Our prototype functionality didn't differentiate between the two). User 2 tried clicking "My Account" in the top right before locating the "My Licenses" section in the sidebar and  completing tasks 2 and 3; however, they got stuck again with task 4.

The user once again tried clicking "My Account" in the top right corner, then tried going to "My Licenses". Eventually, they clicked on the "Paid" text located on the license, taking them to the certificate page where they completed task 4.

## Analysis
Both users had trouble with task 4. We expected users to understand our UI language of rounded boxes being buttons, but they didn't realize they could click on the license to view more about it. We think this is because the "license button" is much longer than other buttons.

Since Task 3 (Payment) was easy for both users to complete, we think updating the license list with very similar "Print" or "Info" buttons will improve the user experience and lead to success in this task during future user tests.

An inspiration for our interface was UofT's ACORN student portal where we adopted its sidebar. We think this UI element will be effective since both users didn't have much trouble recognizing how it worked, though further testing with different goals will be needed for validation.
