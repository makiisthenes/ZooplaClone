const listing_data = {
	data : {
        listing_id : 1,
		listing_images: ["https://flatfinder.cdn.fdm.com/cover_image.png", "https://flatfinder.cdn.fdm.com/cover_image.png","https://flatfinder.cdn.fdm.com/cover_image.png","https://flatfinder.cdn.fdm.com/cover_image.png"],
		listing_tags:  ["Highly  Recommended", "Modern", "Eco-friendly"],
		listing_title: "Sudbury Court Drive, Harrow, HA1 3TA",
		listing_subtitle: "Harrow Road, Wembley, HA1",
		monthly_price: 1230,
		weekly_price: 330,
		contract_length: 6,
		property_type: "Studio",
		avg_water_monthly_cost: 35,
		avg_electricity_monthly_cost: 35,
		avg_gas_monthly_cost: 40,
		avg_internet_monthly_cost: 30,

        bathroom_no: 2,
		bedroom_no: 4,
        agent_tel: "07720346841",
		agent_email: "agent007@mi5.gov.uk",

		reviews: {
			no_reviews: 20,
			overall_rating: 3.5,
			reviews : [
				{
					no_rating: 4.5,
					review_content: "one of my hobbies is programming. and when i'm programming this works great.                    ",
					username_id: 20,
					username: "TheVaccine",
					timestamp_epoch: 1648996545703
				},
				{
                    no_rating: 3.5,
					review_content: "Amazing place, excellent services and transport links",
					username_id: 21,
					username: "TrueTinker",
					timestamp_epoch: 1647976545703

                },
				{
                    no_rating: 0.5,
					review_content: "My tyrannosaurus rex loves to play with it.",
					username_id: 22,
					username: "Lawcoste",
					timestamp_epoch: 1318023197289
                },
                {
                    no_rating: 2.5,
					review_content: "My co-worker Atha has one of these. He says it looks narrow.                    ",
					username_id: 23,
					username: "Len",
					timestamp_epoch: 1318023197289
                }
			]
		}
	}
}

const search_data = 
{
	listings_no: 125,
	listings : [
		{ 
			listing_id: 2,
			listing_cover_image_url: "https://flatfinder.cdn.fdm.com/cover_image.png",
			monthly_price: 1230,
			weekly_price: 330,
			bathroom_no: 2,
			bedroom_no: 4,
			listing_title: "Sudbury Court Drive, Harrow, HA1 3TA",
			listing_subtitle: "Harrow Road, Wembley, HA1",
			agent_tel: "07720346841",
			agent_email: "agent007@mi5.gov.uk"
		},
		{
            listing_id: 3,
			listing_cover_image_url: "https://flatfinder.cdn.fdm.com/cover_image.png",
			monthly_price: 1230,
			weekly_price: 330,
			bathroom_no: 2,
			bedroom_no: 4,
			listing_title: "Sudbury Court Drive, Harrow, HA1 3TA",
			listing_subtitle: "Harrow Road, Wembley, HA1",
			agent_tel: "07720346841",
			agent_email: "agent007@mi5.gov.uk"
        },
		{
            listing_id: 4,
			listing_cover_image_url: "https://flatfinder.cdn.fdm.com/cover_image.png",
			monthly_price: 1230,
			weekly_price: 330,
			bathroom_no: 2,
			bedroom_no: 4,
			listing_title: "Sudbury Court Drive, Harrow, HA1 3TA",
			listing_subtitle: "Harrow Road, Wembley, HA1",
			agent_tel: "07720346841",
			agent_email: "agent007@mi5.gov.uk"
        }
	]
}


export {listing_data, search_data} ;