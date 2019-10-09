const prepTasks = [
    {	category: 'Brand Statement',
        caption: 'Reflection: Your Career Journey',
        description: 'Your professional story should outline your career journey. You don’t have to detail each role that you’ve had, especially if you’re a mid career professional. Stick to career highlights, and details that inspired, informed, and motivated you to study at GA and begin your new career.<ul><li>What first sparked your interest in your desired field?<li>What events inspired your career journey?<li>Why did you switch roles previously? What motivated you to make changes when you did (framed in a positive way)?<li>What did you gain from each of your previous roles? How did your previous roles help prepare you for your future desired role?<li>How have your career interests evolved and changed over time? What inspired them to evolve?<li>What led you to this point in your career as a GA student, and your interest in your desired role?</ul>',
        status: 'Not Started'
    },
    {	category: 'Brand Statement',
        caption: 'Reflection: Skills',
        description: 'List as many skills down as you can. Then order each skills, placing your strongest skills first. Later, when you work on your resume and LinkedIn profile, you will be able to access this information and pare the list down to make it more impactful.<ul><li>What are your greatest industry-specific, technical skills (often called hard skills)?<li>What are your greatest transferable skills (skills that are relevant across industries and roles, like communication, problem solving, leadership, etc.)?<li>How would your supervisors describe you?<li>How would your colleagues describe you?</ul>',
        status: 'Not Started'
    },
    // {	category: 'Brand Statement',
    //     caption: 'Reflection: Achievements',
    //     description: 'Reflect on your skills and achievements. Think about the results that you’ve achieved and the impact that you’ve had in prior roles. Write down as many achievements as you can. Then, list them in order with your greatest achievement first. Support each achievement with specific, measurable data, where possible.<ul><li>What are your greatest professional accomplishments? What results did you achieve? For whom?<li>What was the ultimate impact of each of these achievements?<li>What data do you have to support each of your achievements.</ul>',
    //     status: 'Not Started'
    // },
    // {	category: 'Brand Statement',
    //     caption: 'Reflection: Unique Value',
    //     description: 'Reflect on your unique value. Your unique value highlights the things that you can easily and skillfully do that others cannot. Remember to answer these questions freely, without reservation. Later, you can revisit and revise. These questions should be used to spark ideas and give you insight.<ul><li>What type of help do people turn to you for, personally and professionally?<li>What skills and aspects of your career are you most confident about?<li>What do you do better than most people, both personally and professionally?<li>What sets you apart from your peers?<li>What problems do you solve?<li>What do you like to do? What do you like to do that others do not?</ul>',
    //     status: 'Not Started'
    // },
    // {	category: 'Brand Statement',
    //     caption: 'Reflection: Your Passions and Motivators',
    //     description: 'Record your passions and motivators. Your passions and motivators highlight why you are inspired to do the work that you do, and why you are motivated to do this work well.<ul><li>Why are you interested in working in your desired field?<li>What about your desired role and industry are you most passionate about?<li>Why do you do what you do?<li>What motivates you to do great work?<li>What are your professional values? Aim to list at least four core values.</ul>',
    //     status: 'Not Started'
    // },
    // {	category: 'Brand Statement',
    //     caption: 'Reflection: Career Goals',
    //     description: 'Note your immediate, short-term, and long-term career goals. Your long-term goals aren’t necessarily something that you would share with your future contacts during networking or while interviewing, especially if they aren’t directly related to the roles that you would be interviewing for (i.e. in five years you would like to working for another company or for yourself, etc.). You should, however, think about your long-term career goals to gain self-knowledge, and reflect on how your current and long-term career goals align.<ul><li>What roles would you like to apply and interview for in the immediate future?<li>How do your skills and interests align with these desired role?<li>What are your short-term career goals? What would you like to be doing in 1-2 years? (Answer as honestly and freely as you would like in your own reflections. Note, however, that when talking with prospective employers make an effort to align your short term career goals to the work that they do and the role that you are interviewing for.)<li>What are your long-term goals (5+ years)?</ul>',
    //     status: 'Not Started'
    // },
    // {	category: 'Brand Statement',
    //     caption: 'Professional Story: Create a Professional Story Document',
    //     description: 'Successful job searchers have a carefully crafted professional story that they refer back to and pull from when creating job search collateral, and when networking and interviewing. Your professional story should build from your self-reflections. It should have a clear beginning, middle, and end, and should outline your career journey, skills, achievements, unique value, passions and motivators, and career goals.',
    //     status: 'Not Started'
    // },
    // {	category: 'Brand Statement',
    //     caption: 'Professional Story: Tips and Strategies',
    //     description: '<ol><li>Your professional story should have a clear beginning, middle, and end. It should be clear and compelling, highlighting important career events, skills, achievements, your unique value, and passions and motivators. When someone asks you at a networking event or during an interview to tell them about yourself, you should be able to refer to your professional story to give them a clear, compelling, comprehensive yet concise overview of your professional journey and profile.<li>Your professional story should capture the highlights from your self-reflections and address each of the questions below:<ul><li>What life and career events inspired and led me to this point in my career journey?<li>What are my greatest skills?<li>What are my greatest achievements?<li>What is my unique value?<li>What are my passions and motivators?<li>What are my career goals?</ul><li>After reflecting on the questions above, start to craft your professional story. Make sure you have a clear beginning, middle, and end. Use the phrases below to spark ideas for how you can weave your story together.<ul><li>“My passion for ____ was sparked when I _____.”<li>“Through this experience, I was able to develop a deep skill set with___ that I used to _______, resulting in _____.”<li>“That role inspired me to learn more about ______ and I really became passionate about______.”<li>“While I was a _____ at _____ I was able to use my _____ and _____ skills to develop a highly successful ______.”<li>“I was able to solve ______ client’s problem, and deliver _____ solution, while saving the company valuable resources.”<li>“I was called on by my supervisor because of my proven ability to ______ in previous projects, to lead an innovative project serving _____.”<li>“I find great satisfaction being able to______, and helping people to_____.”<li>“I’m looking to launch a career in_____, I’d like to work in a _____ role with an innovative team working to solve _____.”</ul><li>Your professional story will evolve as you continue through the course and beyond. Reflect back on your story to revise it throughout the course, and seek feedback from people you can trust, including your career coach.</ol>',
    //     status: 'Not Started'
    // },
    // {	category: 'Brand Statement',
    //     caption: 'Professional Story: Template',
    //     description: '<ol><li><strong>Part I – Opening:</strong> I’m a [X immersive program] student at General Assembly graduating [date] with a particular interest in [X industry or type of role].<li><strong>Part II – Motivational Story:</strong> Tell a short story about why you first became interested in this area of work. The story could begin with a phrase like, “I first became interested in this field when...” Remember that a story includes a protagonist who faces a challenge or a new situation and makes a choice that results in an outcome.<li><strong>Part III – Transferable Skills:</strong> What transferable skills have you gained from your work history and coursework at General Assembly that make you a good candidate for a position in your new field? Examples could be both technical and soft skills.<li><strong>Part IV – Supporting Experiences:</strong> What two supporting experiences have helped you further develop your skills that would be especially useful for the next job you hope to land in your industry? (e.g. Specific projects in your immersive program, leadership roles/experience, accomplishments from prior work experience)<li><strong>Part V – Closing:</strong> Taken together, write one sentence that conveys how your story, skills, and/or supporting experiences would make you a good fit for a particular industry, role, or company OR something about that company that is particularly exciting to you. ',
    //     status: 'Not Started'
    // },
    {	category: 'Test Category 1',
        caption: 'Reflection: Skills',
        description: 'List as many skills down as you can. Then order each skills, placing your strongest skills first. Later, when you work on your resume and LinkedIn profile, you will be able to access this information and pare the list down to make it more impactful.<ul><li>What are your greatest industry-specific, technical skills (often called hard skills)?<li>What are your greatest transferable skills (skills that are relevant across industries and roles, like communication, problem solving, leadership, etc.)?<li>How would your supervisors describe you?<li>How would your colleagues describe you?</ul>',
        status: 'Not Started'
    },   
    {	category: 'Test Category 2',
        caption: 'Reflection: Skills',
        description: 'List as many skills down as you can. Then order each skills, placing your strongest skills first. Later, when you work on your resume and LinkedIn profile, you will be able to access this information and pare the list down to make it more impactful.<ul><li>What are your greatest industry-specific, technical skills (often called hard skills)?<li>What are your greatest transferable skills (skills that are relevant across industries and roles, like communication, problem solving, leadership, etc.)?<li>How would your supervisors describe you?<li>How would your colleagues describe you?</ul>',
        status: 'Not Started'
    },   ];

module.exports = prepTasks;