<?php 
$pages = array(
        "Home" => new EnhancedPage("home",
				$siteInfo->dealerCity . ' Mazda Dealership | ' . 
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . ' | ' . 
				$siteInfo->dealerName . ' | ' . $siteInfo->dealerState,
				
				$siteInfo->dealerName . ' has the new, used & pre-owned Mazdas that ' .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . ' needs. Use the ' .
				$siteInfo->dealerName . ' website to build and price your new vehicle, view our new, ' .
				'used & pre owned inventory, order parts, apply for financing, even schedule service or maintenance.',
				
				"<!-- displayHTML = true -->
	<h2>$siteInfo->dealerName - $siteInfo->dealerCity, $siteInfo->dealerState</h2>
	<p>Stop by and visit us today at $siteInfo->dealerName, servicing " . 
	$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . ' areas. ' . 
	'Come checkout the coolest Mazda models like the MAZDA3 or the MAZDA6. ' .
	" The staff here at $siteInfo->dealerName take pride in the vehicles we sell and strive to succeed in great customer experience and satisfaction. </p>
	<p>Whether you are looking for a new MAZDA5, RX-8, or CX-7, our friendly staff at 
	$siteInfo->dealerName are eager to assist you in your car buying process.</p>
	
	<p>At $siteInfo->dealerName we give you easy access to the most up-to-date internet car buying tools. " .
	"You can quickly view our new " . $siteInfo->printLink('new-specials', 'Mazda Specials') . " and " . 
	$siteInfo->printLink('used-specials', 'used car specials') . ", search for a " .
	$siteInfo->printLink('new-inventory', 'new 2010 Mazda inventory') . ', ' . $siteInfo->printLink('used-inventory/Mazda', 'used Mazda') .
	", or view our entire " . $siteInfo->printLink('used-inventory', 'used car inventory') .
	', and even ' . $siteInfo->printLink('build-your-own', 'research') . ' or compare your new vehicle. ' .
	"Call us today at $siteInfo->phoneNumber  or use our site to  request a test drive, ".
	$siteInfo->printLink('finance-application', 'apply for a car loan') . ', ' .
	$siteInfo->printLink('schedule-service', 'schedule your next service appointment') . ', or even get ' .
	$siteInfo->printLink('hours-location', 'door to door directions') . " to our dealership in " .
	$siteInfo->dealerCity . '. </p>
	' . $siteInfo->printMazdaInventoryList()."
	<div class='clearIt'>&nbsp;</div>"
		),
		
        "New Inventory" => new EnhancedPage("new-inventory",
				"$siteInfo->dealerCity  New Mazda Inventory | " . $siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . " | $siteInfo->dealerName |  $siteInfo->dealerState",
				$siteInfo->dealerName . " proudly sells MAZDA3, CX-9, Tribute and the rest of the Mazda family of vehicles in the " . $siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . 
				" areas. View pictures and information about your next Mazda,  or even get a price quote.",
				array("At " . $siteInfo->printLink("Home", $siteInfo->dealerName) . 
					' our full line of Mazda vehicles, including the MAZDA3, CX-9, and Tribute ' .
					" are available for you to view and test drive. Browse pictures and detailed information about " .
					"Mazda's wide selection of cars, trucks, or SUVs in our online inventory.",
					
					"If you are in the " . $siteInfo->getCities(array("conjunction" => "or", "delim" => ","), true) .
					" areas, be sure to check out the wide selection of new Mazdas available at $siteInfo->dealerName. " .
					" Once you find that  new Mazda you're looking for, whether it is the MAZDA6, or the MAZDA MX-5 Miata, ".
					 "contact one of our friendly team members by filling out a " . 
					$siteInfo->printLink('contact-us', 'quick contact form') . 
					" or by calling us at " . $siteInfo->phoneNumber .
					". You can also check out any of our " . $siteInfo->printLink('new-specials', 'new Mazda specials') .
					" for a great deal on your new vehicle."
				)
			),

        "Used Inventory" => new EnhancedPage("used-inventory",
				"$siteInfo->dealerCity Used Pre Owned Car Truck & SUV Inventory  | " . $siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . " | $siteInfo->dealerName |  $siteInfo->dealerState",
				
				$siteInfo->dealerName . " proudly sells a great selection of used & pre-owned cars, trucks, " .
				"and SUVs in the " . $siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) .
				" areas. Browse our used inventory and schedule a test drive today!",
				
				"At " . $siteInfo->printLink('Home', $siteInfo->dealerName) . " you will find a great selection " .
				"of used and pre owned cars, trucks, and SUVs that fits any budget. Used car shoppers can view " .
				"pricing, mileage, and pictures of quality used and pre-owned vehicles in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. " .
				"When you find the pre-owned car, truck, or SUV that " .
				"suits you, you can fill out the contact form or call us at " . $siteInfo->phoneNumber . 
				" and one of our sales specialists will be happy to assist you. At " . $siteInfo->dealerName .
				", you'll get a great deal on the used vehicle that you need."
        ),
		"About Us" => new EnhancedPage("about-us",
				"Find Out More About $siteInfo->dealerName | " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -"), true) . " | " .
				"Mazda Dealership | $siteInfo->dealerState",
				"$siteInfo->dealerName, serves the " . $siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) .
				" areas. Find out more about $siteInfo->dealerName, and discover all the " .
				"Mazda vehicles on our lot waiting just for you.",
				array(
					$siteInfo->printLink('Home', $siteInfo->dealerName) . " serving " .
					$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) .
					" is proud to be an automotive leader in our community. Since opening our doors, " .
					$siteInfo->dealerName . " has maintained a solid commitment to you, our customers, " . 
					"offering the widest selection of " . $siteInfo->printLink('new-inventory', "new 2010 Mazda") .
					" vehicles while maintaining a friendly and courteous staff to assist you with any question you may have. ",
					
					"Whether you are in the market to purchase a new Mazda like the MX-5 Miata or the Mazda Tribute, a " .
					$siteInfo->printLink('used-inventory', 'used/pre-owned vehicle') . ", or if you need " .
					$siteInfo->printLink('finance-application', 'financing options') . 
					", we'll help you find a car loan that works for you! Even if you have bad credit or " .
					"are a first time car buyer, you can trust that $siteInfo->dealerName will get you into the " .
					"automobile of your choice. ",
					
					$siteInfo->dealerName . "'s professionally managed Parts and Service Departments are " . 
					"open extended hours to accommodate our customers' busy schedules; and we offer " .
					"competitive pricing for your automotive maintenance needs. Please feel free to " .
					"contact us at $siteInfo->phoneNumber if you have any questions."
				)
		),
		"Body Shop" => new EnhancedPage("body-shop",
				"Auto Body Shop $siteInfo->dealerCity, Collision Center | " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . " Areas | " .
				" Mazda Dealership | $siteInfo->dealerName | $siteInfo->dealerState",
				
				"Need a Body Shop? " . $siteInfo->dealerName . "'s,Collision Center has the technology " .
				"to get your Car, Truck or SUV looking like new again. $siteInfo->dealerName serves " . 
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ",")) . " areas. For more " .
				"information or to schedule an appointment contact us. ",
				array(
					$siteInfo->printLink('Home', $siteInfo->dealerName) . " will take care of any of your " .
					" auto body needs.  Whether it's a few scratches from a fender bender or your car needs " .
					"some major body work from a car accident, $siteInfo->dealerName has the tools and technology " .
					"to fix your car like new.  Whether you live in the " . 
					$siteInfo->getCities(array("conjunction" => "or", "delim" => ","), true) . 
					" areas, $siteInfo->dealerName is here to serve you.  $siteInfo->dealerName " .
					"does body work on cars, trucks, and SUVs.  Stop by today and get an estimate.",
					
					$siteInfo->dealerName . "'s professionally managed Body Shop/Collision Center is open extended " .
					"hours to accommodate our customers' busy schedules; we offer competitive pricing for your " .
					" automotive maintenance needs. Please feel free to contact us at $siteInfo->phoneNumber if you have any questions."
				)
		),
		"Build Your Own" => new EnhancedPage("build-your-own",
				"$siteInfo->dealerCity Build Your Own Mazda | " . 
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . 
				" | $siteInfo->dealerName |  $siteInfo->dealerState",
				$siteInfo->dealerName . "'s website lets you and build your own " .
				"Mazda Tribute, Mazda CX-7, CX-9, or any other Mazda model. ",
				"Come visit us if you live near " . $siteInfo->getCities(array("conjunction" => "or", "delim" => " ,")) . 
				". Want to customize your own Mazda? " .
				"With " . $siteInfo->dealerName . "'s build-your-own configurator, you can build or research " .
				"your new car, and choose all of the options you want. Whether you are looking for a " .
				$siteInfo->printLink('new-inventory/mazda-tribute', 'Mazda Tribute') . ", " .
				$siteInfo->printLink('new-inventory/mazda-cx_7', 'Mazda CX-7') . ", or a " .
				$siteInfo->printLink('new-inventory/mazda-cx_9', 'Mazda CX-9') .				 
				", $siteInfo->dealerName has it. Once you have built the car of your dreams, call our knowledgeable " .
				"sales staff at $siteInfo->phoneNumber, or " . 
				$siteInfo->printLink('finance-application', 'apply for financing') . ". $siteInfo->dealerName proudly serves " .
				"the " . $siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. "
		),
		"Coupons" => new EnhancedPage("coupons",
				"Coupons and Discounts For Parts and Accessories on Mazda Models | " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -"), true) . " Areas | " .
				"$siteInfo->dealerName | $siteInfo->dealerState",
				"$siteInfo->dealerName offers a wide variety of coupons for savings on parts and accessories on " .
				"Mazdas.  Coupons range from discounts " .
				"on service and parts, to discounts on new and used cars.  If you live in " . 
				$siteInfo->getCities(array("conjunction" => "or", "delim" => ","), true) . " areas, check back often " .
				"for special coupons on your new or pre-owned Mazda.",
				
				array("At " . $siteInfo->printLink('Home',$siteInfo->dealerName) . ",  you will find a wide range of ". 
					"coupons that offer savings on all kinds of parts and accessories for Mazdas from oil changes to " .
					"discounts on parts that you need for a new or used Mazda" . 
					". Check back often for new coupons because this page is updated regularly.  If you do not see the coupons " .
					"you need or want feel free to call us at $siteInfo->phoneNumber for the most up to date offers on " .
					"coupons, one of our team members will be pleased to help you get the get the information you need.",
					
					"If you would like to see some of the other discounts and promotions that $siteInfo->dealerName has to offer, please view our " .
					$siteInfo->printLink('new-specials', 'new') . " and " .$siteInfo->printLink('used-specials', 'pre-owned') .
					" specials pages.  $siteInfo->dealerName offers discounts on Mazdas in the " .
					$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas."
				)
				
		),
		
		"Community" => new EnhancedPage("community",
				"$siteInfo->dealerCity | Charity and Philanthropy | " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => " -")) . 
				" | $siteInfo->dealerName | $siteInfo->dealerState",
				
				"$siteInfo->dealerName community outreach program for the " . 
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas.", 
				
				array(
					"$siteInfo->dealerName is proud to be an automotive leader in our community. " .
					"We are also proud to support a number of charitable causes in the " .
					"$siteInfo->dealerCity area. At $siteInfo->dealerName, we understand that our business prospers when our community prospers.",
					"Listed below, you will find a list of the causes we support and contact information should you want to make a contribution or get more information about any of the worthwhile charities and causes $siteInfo->dealerName supports. We thank you for your time and interest. ",
					"$siteInfo->dealerName sells a wide selection of new and used Mazda vehicles. " .
					" Whether you live in " . 
					$siteInfo->getCities(array("conjunction" => "or", "delim" => ","), true) . 
					", we strive to provide you the best service at the best price."
				)
		),
		
		"Apply Online" => new EnhancedPage("finance-application",
				"$siteInfo->dealerCity  Mazda Car Loan, Auto Finance & Credit Application | " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . 
				" | $siteInfo->dealerName | $siteInfo->dealerState",
				
				"$siteInfo->dealerName has all the finance options you need to get a great loan for " .
				"your next new or used car, " .
				"truck, or SUV purchase. Fill out our easy online credit application to get approved for your " .
				"next Mazda purchase in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas.",
				
				$siteInfo->printLink('Home',$siteInfo->dealerName) . " is committed to helping you find the " .
				"financing you need for the " . $siteInfo->printLink('new-inventory', 'new 2010 Mazda') . 
				" you want. Fill out our easy online credit application to get approved for a car loan on " .
				"a new or " . $siteInfo->printLink('used-inventory', 'used vehicle') . " in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. One of our " .
				"friendly auto finance specialists will get back to you shortly to assist you in obtaining the " .
				"credit you deserve. If you'd rather speak to one of our car " .
				"finance experts over the phone, please call us at $siteInfo->phoneNumber."
		),
			"Special Finance" => new EnhancedPage("special-finance",
				"$siteInfo->dealerCity Bad Credit, No Credit Car Loans, Auto Loans, Special Auto Financing | " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . 
				" | $siteInfo->dealerName | $siteInfo->dealerState",
				
				"Stop by $siteInfo->dealerName and we'll help you finance that new or used vehicle. Whether " .
				"you have good credit, poor credit, bad credit, or no credit, we'll get you the financing you " .
				"need, just fill out our Special Financing form. $siteInfo->dealerName serves the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. " .
				"$siteInfo->dealerName has helped many before you get the car, truck, or SUV they want with " .
				"the financing they need! ",
				
				array(
					"Do you have bad credit, no credit, or are you a first time car buyer in the " .
					$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas? " .
					$siteInfo->printLink('Home',$siteInfo->dealerName) . " can get you the financing you " .
					"need to get the car, truck, or SUV you want. $siteInfo->dealerName has many lenders that can " .
					"give you the best financing for your " . $siteInfo->printLink('new-inventory', 'new Mazda') . 
					" you've been looking for. We are also here to help you rebuild your credit " .
					"with a great auto loan.",
					
					"Making on-time payments toward your car loan is a wonderful way to get your credit rebuilt " .
					"and back on the right track. Don't let a bad credit situation keep you from getting into your " .
					"new or " . $siteInfo->printLink('used-inventory','used/pre-owned car') . " today. Take a couple " .
					"of minutes to fill out our easy financing application and one of our friendly finance " .
					"specialists will contact you soon. You can also reach us directly at $siteInfo->phoneNumber."
				)
		),
		"Location" => new EnhancedPage("hours-location",
				"Driving Directions to $siteInfo->dealerName | Hours & Location | " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => " -"), true) . " | $siteInfo->dealerState",
				
				"$siteInfo->dealerName, serving the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas, is open " .
				"extended hours for your convenience. You can also use our interactive map feature to get " .
				"driving directions right to our door.",
				
				"At " . $siteInfo->printLink('Home',$siteInfo->dealerName) . ", we strive to make our customers happy." .
				" Below, you can see our hours of operation, and also get step-by-step driving directions from " .
				"your doorstep to ours. While you are at $siteInfo->dealerName, you can see our extensive inventory " . 
				"of " . $siteInfo->printLink('new-inventory','new') . " and " .
				$siteInfo->printLink('used-inventory','used') . " Mazdas." . 
				" We work hard to get you into the vehicle you have always wanted. That new " .
				$siteInfo->printLink('new-inventory', '2010 Mazda') . " is waiting for you, and we deal " .
				"with a wide variety of lending sources to make sure you will get the most complete and " .
				"comprehensive " . $siteInfo->printLink('finance-application', 'car loan and auto financing') . 
				" package available in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas."
		),
		"New Car Info" => new EnhancedPage("new-car-info",
			"$siteInfo->dealerCity Research " . 
			$siteInfo->printModels(array("conjunction"=>"", "delim"=>" - ")) .
			" | " . $siteInfo->getCities(array("conjunction" => "", "delim" => " -")) .
			" |  $siteInfo->dealerName |  $siteInfo->dealerState",
			
			"Come to $siteInfo->dealerName and research MAZDA3, MAZDA6, or CX-7 vehicles in " . 
			$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . ". With our " .
			"New Car Info tool, you can research all the new models that Mazda have to offer.",
			array(
				"Here at $siteInfo->dealerName we make it easy to find the Mazda " . 
				" that you are looking for.  Use our New Car info tool to quickly find a new vehicle " .
				"within your price range, view images, research optional features and compare " .
				"each vehicle.  $siteInfo->dealerName has full reviews of each model that you " .
				"are interested in.  Once you find the Mazda that you are " .
				"looking for, simply click on the Quick Quote button and fill out our short form " . 
				" and one of the team members at $siteInfo->dealerName will be happy to assist you " .
				"in your new car purchase.  Or you can give us a call directly at $siteInfo->phoneNumber.",
				"Want to customize your own Mazda? With " .
				$siteInfo->dealerName . "'s Build Your Own configurator module your can build, " . 
				"research, and choose the options you have always wanted. Whether you are looking for a " .
				"MAZDA3, MAZDA6, or a CX-7, " .
				"$siteInfo->dealerName has it. Once you have built the car of your dreams contact " .
				"one of our friendly team members today by filling out a form or calling us at " .
				$siteInfo->phoneNumber . ". $siteInfo->dealerName proudly serves the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas."
			)
		),
		"Order Parts" => new EnhancedPage("order-parts",
				"$siteInfo->dealerCity  Order Parts for Mazda Online | " . 
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . 
				" | $siteInfo->dealerName |  $siteInfo->dealerState",
				
				"Order parts with ease for your new Mazda " . 
				" vehicle from $siteInfo->dealerName now. Whether you are in " . 
				$siteInfo->getCities(array("conjunction" => "or", "delim" => ","), true) . 
				", $siteInfo->dealerName has all the parts you need for your Mazda.",
				"Need parts for your " . $siteInfo->printLink('new-inventory', 'new Mazda') . "? " .
				$siteInfo->printLink('Home',$siteInfo->dealerName) . ", serving the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas, can get you " .
				"what you need. We take all the guess work out or ordering parts online so that you get exactly " .
				"what you are looking for. Just fill out the form below, giving us as much detail as you can, " .
				"and one of our friendly parts specialists will take care of your order right away. You can also " .
				"call us at $siteInfo->phoneNumber and our professional, experienced parts associates will take your " .
				"order and answer any questions you might have."
		),
		"Order Parts - 3rd PARTY " => new EnhancedPage("order-parts",
				"$siteInfo->dealerCity  Order Parts for Mazda Online | " . 
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . 
				" | $siteInfo->dealerName |  $siteInfo->dealerState",
				"Call us now at $siteInfo->phoneNumber and our friendly, experienced agents " .
					 $siteInfo->dealerName .  " will take your order and answer any questions you might have.",
					 "Browsing through our catalog of over 500,000 car parts may look daunting, but leave it to our well-informed team to help you find what you're looking for. If you need assistance locating a part or if you have part-related questions, we'll walk you through our inventory step-by-step, SKU-by-SKU. It's just like searching through the $siteInfo->dealerName warehouse in person! We'll make sure you'll have everything you need to make an informed and hassle-free purchase with us."
		),
		"Quick Contact" => new EnhancedPage("quick-contact",
				"Contact $siteInfo->dealerName Now | a Mazda Dealer Serving the " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -"), true) . " | $siteInfo->dealerState",
				
				"Contact $siteInfo->dealerName right now and get the help you need in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. Our friendly " .
				"staff is standing by to help you with your new Mazda, or anything else you need.",
				
				"Need some help? At " . $siteInfo->printLink('Home',$siteInfo->dealerName) . " in " .
				$siteInfo->dealerCity . ", our friendly and professional staff is ready to assist." .
				" Just fill out the form below and someone from $siteInfo->dealerName " .
				"will get back to you shortly. You can also call us at $siteInfo->phoneNumber to get the " .
				"information you need. $siteInfo->dealerName is proud to be an automotive leader in our " .
				" community, including " . $siteInfo->getCities(array("conjunction" => "and", "delim" => ",")) .
				". Since opening our doors, $siteInfo->dealerName has maintained our solid commitment to offering " .
				"the widest selection of " . $siteInfo->printLink('new-inventory', 'Mazdas') .
				" and exceptional " . $siteInfo->printLink('finance-application', 'financing options') . 
				" to our customers."
		),
		"Specials New" => new EnhancedPage("specials-new",
				"$siteInfo->dealerCity New Mazda " .
				" Specials | " . $siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . 
				" Specials for MAZDA6, MAZDA MX-5 Miata, or RX-8 | $siteInfo->dealerName | $siteInfo->dealerState",
				
				"At $siteInfo->dealerName, you can view pictures and detailed information about our impressive " .
				" specials on any new Mazda " .
				" vehicles for the " . $siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) .
				" areas. With our multiple financing options, purchasing a new Mazda from our new vehicle " .
				"specials is easier than ever.",
				
				"Below are our new Mazda inventory specials. You can check out " .
				$siteInfo->dealerName . "'s fantastic specials on a wide variety of " .
				$siteInfo->printLink('new-inventory', 'new Mazdas') . " in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. Browse " .
				"through our list of specials to find the vehicle you've always wanted. You can also sign up " .
				"for a test drive, request a quote, and even " .
				$siteInfo->printLink('value-your-trade', 'value your trade-in vehicle') . ". Check back often " .
				"because our new vehicle specials change frequently! You can also give us a call at " .
				$siteInfo->phoneNumber . ", and one of our experienced associates will help get you a great " .
				"deal on your new " . $siteInfo->printLink('new-inventory', 'Mazda') . "."
		),
		"Specials Used" => new EnhancedPage("specials-used",
				"$siteInfo->dealerCity Used Car Truck & SUV Specials Mazda | " . $siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . " | $siteInfo->dealerName |  $siteInfo->dealerState",
				"At $siteInfo->dealerName, you can view pictures and detailed information about our great specials " .
				"on used & pre-owned cars, trucks, and SUVs in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. With our " .
				"multiple  financing options, purchasing a used or pre-owned car, truck, or SUV from our used " .
				"vehicle specials is easier than ever.",
				
				"$siteInfo->dealerName has some great offers on used and pre-owned cars, trucks, and SUVs in the " .
				" $siteInfo->dealerCity area. For an even better deal on reasonably priced used autos, view our " .
				"used vehicle specials below. Here at $siteInfo->dealerName, our pre-owned specials page makes it easy to sign up for a test drive, request a quote, even value your trade-in on your current vehicle. You can also call us at $siteInfo->phoneNumber for help finding the used car, truck, or SUV that you need at a price you can afford. "
		),
		"Schedule Service" => new EnhancedPage("schedule-Service",
				"$siteInfo->dealerCity Mazda Schedule Service & Maintenance | " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => " -")) .
				" | $siteInfo->dealerName | $siteInfo->dealerState",
				"If you need your Mazda worked on, come see us at $siteInfo->dealerName. " .
				"From a quick oil change to complete engine overhauls, our experienced service department will " .
				"get you back on the road. $siteInfo->dealerName proudly services cars in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas.",
				
					"<!-- displayHTML = true -->
					<p>At $siteInfo->dealerName we offer a wide range of car repairs and service updates. " .
					"These updates include general repairs and maintenance, Mazda " . 
					" factory recalls and also warranty service on all Mazda " . 
					" models, including MAZDA3 5-DOOR, Mazda MX-5 Miata, or the Mazda Tribute" . 
					". Whether you need an oil change, transmission service, brake pads, or even engine repair, " .
					$siteInfo->dealerName . " has you covered. If you are in the " .
					$siteInfo->getCities(array("conjunction" => "or", "delim" => ","), true) . " area, fill " .
					"out the form below, letting us know the make and model of your vehicle, what type of work you " .
					"need performed, and when you'd like to have it done. One of our friendly and experienced service specialists will contact you shortly. </p>
					<p>Listed below are some of the many types of services we offer to our customers. Sorry, we " .
					"cannot provide pricing due to the hundreds of different makes and models that we " .
					"service. If you would like an estimate, please call us at $siteInfo->phoneNumber. We would " .
					"be pleased to provide you with an estimate over the phone.</p>
<table style='FONT-WEIGHT: normal; FONT-SIZE:10px;' border='0' cellpadding='0' cellspacing='0' title='Schedule Service - " . $siteInfo->getCities(array("conjunction" => "", "delim" => ","), true) . " - $siteInfo->dealerName'>
	<tbody> 
		<tr> 
			<td> 
				<ul> 
					<li>Oil Change</li> <li>Tire Mounting, Rotation and Balance</li> 
					<li>Transmission Service</li> <li>30K, 60K, 90K Service</li> 
					<li>Engine Diagnostic (Check engine light, fluid light, service light, etc)</li> 
					<li>Brake System (Pads, rotor, lines, etc)</li> <li>Heating/Cooling Systems</li> 
				</ul> 
			</td> 
			<td> 
				<ul> 
					<li>Head Gasket/Valves</li> <li>Exhaust Systems</li> 
					<li>Electronic Motors (Windows, fan, etc.)</li> <li>Engine Replacement or Rebuild</li>
					<li>Fuel Systems (Filters, hoses, pumps, etc)</li> <li>Steering Systems</li> 
					<li>Belts (Timing, alternator, etc)</li> 
				</ul> 
			</td> 
			<td> 
				<ul> 
					<li>Electrical Systems</li> <li>Ignition System</li> 
					<li>Emission Control System</li> 
					<li>Suspension System (Axle, mounts struts, etc)</li> 
					<li>Clutch Repair/replacement</li> <li>Warranty Repairs</li> 
				</ul> 
			</td> 
		</tr> 
	</tbody> 
</table>
				"
		),
		"Value Your Trade" => new EnhancedPage("value-your-trade",
				$siteInfo->dealerCity . ' Mazda ' . 
				' Dealership | Value Your Trade | ' .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => " -"), true) . 
				" | $siteInfo->dealerName | $siteInfo->dealerState",
				
				"Use " . $siteInfo->dealerName . "'s website to value your trade in for a quality " . 
				"new or pre-owned auto purchase from $siteInfo->dealerName. Serving the " . 
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . 
				" $siteInfo->dealerState areas.",
				
				"At $siteInfo->dealerName, you can Value Your Trade towards a great selection of new " .
				$siteInfo->printLink('new-inventory', 'Mazda') . " vehicles. We also have a " .
				"large selection of " . $siteInfo->printLink('used-inventory', 'pre-owned vehicles') . 
				" to choose from. $siteInfo->dealerName in $siteInfo->dealerCity is proud to be an " .
				"automotive leader in the community. $siteInfo->dealerName serves the " . 
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ",")) . " areas. Call " .
				"us today at $siteInfo->phoneNumber for a great deal on your next vehicle purchase."
				
			),
		"View Our Ad" => new EnhancedPage("view-our-ad",
				"$siteInfo->dealerCity Mazda Promotional Offers | " . $siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . " | $siteInfo->dealerName |  $siteInfo->dealerState",
				$siteInfo->dealerName . "'s current ads and promotional offers for new and used " .
				"Mazdas. Get a great deal on your next Mazda " .
				" in the " . $siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . 
				" areas today.",
				"At $siteInfo->dealerName, check out our special offerings on Mazda vehicles. These include the " .
				"MAZDA6, MAZDASPEED3, RX-8 and other models we sell. With these offers, you can save thousands on the new car or truck you're looking for. Make sure to pick up the phone and call $siteInfo->phoneNumber to get the latest unpublished specials!"
		)
	); // END $pages array
      
?>