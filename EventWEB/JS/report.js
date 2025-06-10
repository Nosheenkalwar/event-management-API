const attendees_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tattendees"
fetch(attendees_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('at').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const events_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tevents"
fetch(events_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('event').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const registrations_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tregistrations"
fetch(registrations_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('reg').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const payments_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tpayments"
fetch(payments_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('pay').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const feedback_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tfeedback"
fetch(feedback_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('feed').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const venues_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tvenues"
fetch(venues_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('venues').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const organizers_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Torganizers"
fetch(organizers_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('org').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const event_categories_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tevent_categories"
fetch(event_categories_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('catg').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const sponsors_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tsponsors"
fetch(sponsors_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('sponsors').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const staff_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tstaff"
fetch(staff_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('staff').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const tickets_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Ttickets"
fetch(tickets_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('tick').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const notifications_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tnotifications"
fetch(notifications_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('not').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const schedules_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tschedules"
fetch(schedules_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('sched').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});

const users_count_Link = "https://opulent-computing-machine-jj9v77xj967q37gv-6007.app.github.dev/Tusers"
fetch(users_count_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
   document.getElementById('users').innerHTML+= data[0].count;
}).catch(err=>{
    console.log(err.message);
});



