<?php 
$pages = array(
        "Home" => new EnhancedPage("home",
				$siteInfo->dealerCity . ' Pre-Owned - Used ' . 
				$siteInfo->getMakes(array("conjunction" => "", "delim" => " -")) . ' Dealership | ' 
				. $siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . ' | ' . 
				$siteInfo->dealerName . ' | ' . $siteInfo->dealerState,
				
				$siteInfo->dealerName . ' has the  used & pre-owned ' . $siteInfo->getMakes() . ' that those in ' .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . ' need. Use the ' .
				$siteInfo->dealerName . ' website to find the auto that you need at a cheap price. View our ' .
				'used & pre owned inventory, order parts, apply for financing, schedule service or maintenance.',
				
				array(
					"$siteInfo->dealerName has quality used and pre-owned " . $siteInfo->getMakes() . " that will " . 
					"fit your budget. Located in $siteInfo->dealerCity, our staff have a proven " .
					"track record of quality customer service, creating a courteous and respectful buying experience." . 
					" Call $siteInfo->phoneNumber or come by; we are a short drive from the " .
					$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas.",
					
					"Use our website to " . $siteInfo->printLink('used-inventory', 'view our inventory') . 
					", search for " . $siteInfo->printLink('used-specials', 'used car specials') . ", " .
					$siteInfo->printLink('finance-application', 'apply for a loan') . " or learn about " .
					$siteInfo->printLink('about-us', 'our dealership') . ". You can even " . 
					$siteInfo->printLink('schedule-service', 'schedule your next service appointment') . 
					". We are sure you'll discover " . "$siteInfo->dealerName is the right place to " .
					"buy your next " . $siteInfo->getMakes(array("conjunction" => "or", "delim" => ",")) . "."
				)
		),
	    "Used Inventory" => new EnhancedPage("used-inventory",
				"$siteInfo->dealerCity Used Pre Owned " . $siteInfo->getMakes(array("conjunction" => "", "delim" => " -"))
				. " Inventory | " . $siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . " | $siteInfo->dealerName |  $siteInfo->dealerState",
				
				$siteInfo->dealerName . " proudly sells a great selection of used & pre-owned " .
				$siteInfo->getMakes(array("conjunction" => "and", "delim" => ",")) . 
				" in the " . $siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) .
				" areas. Browse our used inventory and schedule a test drive today!",
				
				"At " . $siteInfo->printLink('Home', $siteInfo->dealerName) . " you will find a great selection " .
				"of used and pre owned " . $siteInfo->getMakes(array("conjunction" => "and", "delim" => ",")) .
				" that will fit any budget. Used car shoppers can view pricing, mileage, and pictures of quality " .
				"used and pre-owned vehicles in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. " .
				"When you find the pre-owned " . 
				$siteInfo->getMakes(array("conjunction" => "or", "delim" => ",")) . " that " .
				"suits you, you can " . $siteInfo->printLink('finance-application', 'find financing') . 
				" or call us at " . $siteInfo->phoneNumber . 
				" and one of our sales specialists will be happy to assist you. At " . $siteInfo->dealerName .
				", you'll get a great deal on the used vehicle that you need."
        ),
		"About Us" => new EnhancedPage("about-us",
				"Find Out More About $siteInfo->dealerName | " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => ","), true) . " | Used and Pre-owned " .
				$siteInfo->getMakes() . " Dealership | $siteInfo->dealerState",
				
				"$siteInfo->dealerName, serves the " . 
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) .
				" areas. Find out more about $siteInfo->dealerName, and discover all the used " .
				$siteInfo->getMakes(array("conjunction" => "and", "delim" => ",")) . 
				" vehicles on our lot waiting just for you.",
				
				array(
					$siteInfo->printLink('Home', $siteInfo->dealerName) . " serving " .
					$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) .
					" is proud to be an automotive leader in our community. Since opening our doors, " .
					$siteInfo->dealerName . " has maintained a solid commitment to you, our customers, " . 
					"offering the widest selection of used and pre-owned " . $siteInfo->getMakes(array("conjunction" => "and", "delim" => ","))  .
					" and ease of purchase.",
					
					"Search our " .	$siteInfo->printLink('used-inventory', 'used car inventory') . " for great deals on " . 
					$siteInfo->getMakes(array("conjunction" => "or", "delim" => ",")) . ". If you need " .
					$siteInfo->printLink('finance-application', 'financing options') . 
					", we'll help you find a car loan that works for you! Even if you have bad credit or " .
					"are a first time car buyer, you can trust that $siteInfo->dealerName will get you into the " .
					"automobile of your choice. ",
					
					$siteInfo->dealerName . "'s professionally managed Parts and Service Departments are " . 
					"open extended hours to accommodate our customers' busy schedules. We offer " .
					"competitive pricing for your automotive maintenance needs. Please feel free to " .
					"contact us at $siteInfo->phoneNumber if you have any questions."
				)
		),
		"Body Shop" => new EnhancedPage("body-shop",
				"Auto Body Shop $siteInfo->dealerCity, Collision Center | " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . " Areas | Used and Pre-owned " .
				$siteInfo->getMakes(array("conjunction" => "", "delim" => " -")) . " Dealership | " .
				"$siteInfo->dealerName | $siteInfo->dealerState",
				
				"Need a Body Shop? " . $siteInfo->dealerName . "'s Collision Center has the technology " .
				"to get your vehicle looking like new again. $siteInfo->dealerName serves " . 
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ",")) . " areas. For more " .
				"information or to schedule an appointment contact us. ",
				array(
					$siteInfo->printLink('Home', $siteInfo->dealerName) . " will take care of any of your " .
					" auto body needs.  Whether it's a few scratches from a fender bender or your car needs " .
					"some major body work from a car accident, $siteInfo->dealerName has the tools and technology " .
					"to fix your car like new. Serving the " . 
					$siteInfo->getCities(array("conjunction" => "or", "delim" => ","), true) . 
					" areas, $siteInfo->dealerName offers a relaxing car buying experience.  $siteInfo->dealerName " .
					"does body work on any " . $siteInfo->getMakes(array("conjunction" => "and", "delim" => ",")) .
					".  Stop by today and get an estimate.",
					
					$siteInfo->dealerName . "'s professionally managed Body Shop/Collision Center is open extended " .
					"hours to accommodate our customers' busy schedules; we offer competitive pricing for your " .
					" automotive maintenance needs. Please feel free to contact us at $siteInfo->phoneNumber if you have any questions."
				)
		),
		"Coupons" => new EnhancedPage("coupons",
				"Coupons and Discounts For Parts and Accessories on " .
				$siteInfo->getMakes(array("conjunction" => "", "delim" => " -")) . " | " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -"), true) . " Areas | " .
				"$siteInfo->dealerName | $siteInfo->dealerState",
				
				"$siteInfo->dealerName offers a wide variety of coupons for savings on parts and accessories on used and pre-owned " .
				$siteInfo->getMakes(array("conjunction" => "and", "delim" => ",")) . ".  Coupons range from discounts " .
				"on service and parts, to discounts on used cars.  ",
				
				array("At " . $siteInfo->printLink('Home',$siteInfo->dealerName) . ",  you will find a wide range of ". 
					"coupons that offer savings on all kinds of parts and accessories for " . 
					$siteInfo->getMakes(array("conjunction" => "or", "delim" => ",")) .
					"Check this page often for new coupons for service coupons for routine maintenance like oil changes or tire rotations, or discounts for popular parts and accessories. " .
					"For any questions regarding these offers, call $siteInfo->phoneNumber and one of our team members will be pleased to help you get the get the information you need.",
					
					"If you would like to see some of the other discounts and promotions that $siteInfo->dealerName offer, please view our " . 
					$siteInfo->printLink('used-specials', 'pre-owned') .
					" specials pages.  $siteInfo->dealerName offers discounts on " .
					$siteInfo->getMakes() . " in the " .
					$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas."
				)
				
		),
		"Community" => new EnhancedPage("community",
				"$siteInfo->dealerCity | Charity and Philanthropy | " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ",")) . 
				" | $siteInfo->dealerName | $siteInfo->dealerState",
				
				"$siteInfo->dealerName community outreach program for the " . 
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas.", 
				
				array(
					"$siteInfo->dealerName is proud to be an automotive leader in our community. " .
					"We are also proud to support a number of charitable causes in the " .
					"$siteInfo->dealerCity area. At $siteInfo->dealerName, we understand that our business prospers when our community prospers.",
					"Listed below, you will find a list of the causes we support and contact information should you want to make a contribution or get more information about any of the worthwhile charities and causes $siteInfo->dealerName supports. We thank you for your time and interest. ",
					"$siteInfo->dealerName sells a wide selection of used " .
					$siteInfo->getMakes(array("conjunction" => "and", "delim" => ",")) . ". Whether you live in " . 
					$siteInfo->getCities(array("conjunction" => "or", "delim" => ","), true) . 
					", we strive to provide you the best service at the best price."
				)
		),
		
		"Apply Online" => new EnhancedPage("finance-application",
				"$siteInfo->dealerCity Used " . $siteInfo->getMakes(array("conjunction" => "", "delim" => " -")) . " Car Loan, Auto Finance & Credit Application | " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . 
				" | $siteInfo->dealerName | $siteInfo->dealerState",
				
				"$siteInfo->dealerName has all the finance options on a variety of " .
				$siteInfo->getMakes(array("conjunction" => "and", "delim" => ",")) . 
				". Fill out our easy online credit application to get approved quickly for your " .
				"purchase in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas.",
				
				$siteInfo->printLink('Home',$siteInfo->dealerName) . " is committed to helping you find the " .
				"financing you need for the " . $siteInfo->printLink('used-inventory', 'used car or truck') . 
				" you want. Fill out our easy online credit application to get approved for a car loan below. " .
				"We've helped many in the " . 
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas find the " .
				"vehicle they need at the right price. One of our " .
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
				"$siteInfo->dealerName has helped many before you get the vehicle they want with " .
				"the financing they need! ",
				
				array(
					"Do you have bad credit, no credit, or are you a first time car buyer in the " .
					$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas? " .
					$siteInfo->printLink('Home',$siteInfo->dealerName) . " has many lenders that can " .
					"give you the best financing for a " . 
					$siteInfo->printLink('used-inventory', 'reliable car or truck') . "that suits your needs. ". 
					"We are also here to help you rebuild your credit with a great auto loan.",
					
					"Making on-time payments toward your car loan is a wonderful way to get your credit rebuilt " .
					"and back on the right track. Don't let a bad credit situation keep you from getting into your " .
					"" . $siteInfo->printLink('used-inventory','used/pre-owned car') . " today. Take a couple " .
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
				"your doorstep to ours. While you are at $siteInfo->dealerName, you can see our " . 
				$siteInfo->printLink('used-inventory','extensive inventory') . " of used and pre-owned " . $siteInfo->getMakes() . 
				" automobiles. We work hard to get you into the vehicle you have always wanted. We deal " .
				"with a wide variety of lending sources in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. " 
		),
		"Order Parts" => new EnhancedPage("order-parts",
				"$siteInfo->dealerCity Order Parts for Your Vehicle Online | " . 
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . 
				" | $siteInfo->dealerName |  $siteInfo->dealerState",
				
				"Order parts for your " . $siteInfo->getMakes(array("conjunction" => "or", "delim" => ",")) . 
				" from $siteInfo->dealerName now. Servicing the " . 
				$siteInfo->getCities(array("conjunction" => "or", "delim" => ","), true) . 
				"areas, $siteInfo->dealerName has all the parts you need for your vehicle.",
				$siteInfo->printLink('Home',$siteInfo->dealerName) . ", serving the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas, can get you " .
				"what you need. We take all the guess work out or ordering parts online so that you get exactly " .
				"what you are looking for. Just fill out the form below, giving us as much detail as you can, " .
				"and one of our friendly parts specialists will take care of your order right away. You can also " .
				"call us at $siteInfo->phoneNumber to talk to one of our professional, experienced parts associates, " .
				"answering any questions you might have."
		),
		"Order Parts - 3rd PARTY " => new EnhancedPage("order-parts-3rd-party",
				"$siteInfo->dealerCity  Order Parts for Your Vehicle Online | " . 
				$siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . 
				" | $siteInfo->dealerName |  $siteInfo->dealerState",
				
				"Call us now at $siteInfo->phoneNumber and our friendly, experienced agents " .
				 $siteInfo->dealerName .  " will take your order and answer any questions you might have.",
				 
				 "Browsing through our catalog of over 500,000 car parts may look daunting, but leave it to our well-informed team to help you find what you're looking for. If you need assistance locating a part or if you have part-related questions, we'll walk you through our inventory step-by-step, SKU-by-SKU. It's just like searching through the $siteInfo->dealerName warehouse in person! We'll make sure you'll have everything you need to make an informed and hassle-free purchase with us."
		),
		"Quick Contact" => new EnhancedPage("quick-contact",
				"Contact $siteInfo->dealerName Now | a " .
				$siteInfo->getMakes(array("conjunction" => "", "delim" => ",")) . " Dealer Serving the " .
				$siteInfo->getCities(array("conjunction" => "", "delim" => ","), true) . " | $siteInfo->dealerState",
				
				"Contact $siteInfo->dealerName right now and get the help you need in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. Use the form " .
				"on this page to get more information about any of the " .
				$siteInfo->getMakes(array("conjunction" => "and", "delim" => ",")) . " we sell.",
				
				"Need some help? At " . $siteInfo->printLink('Home',$siteInfo->dealerName) . " in " .
				$siteInfo->dealerCity . ", our friendly and professional staff is ready to assist." .
				" Just fill out the form below and someone from $siteInfo->dealerName " .
				"will get back to you shortly. You can also call us at $siteInfo->phoneNumber to get the " .
				"information you need. $siteInfo->dealerName is proud to be an automotive leader in our " .
				" community, including the " . $siteInfo->getCities(array("conjunction" => "and", "delim" => ",")) .
				" areas. Since opening our doors, $siteInfo->dealerName has maintained our solid commitment to offering " .
				"the widest selection of " . $siteInfo->printLink('used-inventory', 'pre-owned automobiles') .
				" and exceptional " . $siteInfo->printLink('finance-application', 'financing options') . 
				" to our customers."
		),
		"Specials Used" => new EnhancedPage("specials-used",
				"$siteInfo->dealerCity Used/Pre-Owned Specials  for " . $siteInfo->getMakes() . " and more | " . $siteInfo->getCities(array("conjunction" => "", "delim" => " -")) . " | $siteInfo->dealerName |  $siteInfo->dealerState",
				"At $siteInfo->dealerName, you can view pictures and detailed information about our great specials " .
				"on used & pre-owned " . $siteInfo->getMakes() . " in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas. With our " .
				"multiple financing options, purchasing a used or pre-owned " . $siteInfo->getMakes() . 
				" is easier than ever.",
				
				"$siteInfo->dealerName has some great offers on used and pre-owned cars, trucks, and SUVs in the " .
				" $siteInfo->dealerCity area. For an even better deal on reasonably priced used autos, view our " .
				"used vehicle specials below. Here at $siteInfo->dealerName, our pre-owned specials page makes it easy to sign up for a test drive, request a quote, even value your trade-in on your current vehicle. You can also call us at $siteInfo->phoneNumber for help finding the used car, truck, or SUV that you need at a price you can afford. "
		),
		"Schedule Service" => new EnhancedPage("schedule-Service",
				"$siteInfo->dealerCity " . $siteInfo->getMakes(array("conjunction" => "", "delim" => " -")) . " Schedule Service & Maintenance | " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => " -")) .
				" | $siteInfo->dealerName | $siteInfo->dealerState",
				"We service all kinds of" . $siteInfo->getMakes(array("conjunction" => "and", "delim" => " -")) .
				". From a quick oil change to complete engine overhauls, our experienced service department will " .
				"get you back on the road. $siteInfo->dealerName proudly services cars in the " .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . " areas.",
				
					"<!-- displayHTML = true -->
					<p>At $siteInfo->dealerName we offer a wide range of car repairs and service updates. " .
					"These updates include general repairs and maintenance, " . 
					" factory recalls and also warranty service on models like " . $siteInfo->getMakes() . 
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
				$siteInfo->dealerCity . ' ' . $siteInfo->getMakes(array("conjunction" => "", "delim" => " -")) . 
				' Delearship | Value Your Trade | ' .
				$siteInfo->getCities(array("conjunction" => "and", "delim" => " -"), true) . 
				" | $siteInfo->dealerName | $siteInfo->dealerState",
				
				"Use " . $siteInfo->dealerName . "'s website to value your trade in for a quality " . 
				"new or pre-owned auto purchase from $siteInfo->dealerName. Serving the " . 
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . 
				" $siteInfo->dealerState areas.",
				
				"At $siteInfo->dealerName, you can put the value of your tradein towards a great selection of quality and reliable " .
				$siteInfo->printLink('used-inventory', 'used cars and trucks') . " vehicles. " .
				"$siteInfo->dealerName in $siteInfo->dealerCity is proud to be an " .
				"automotive leader in the community. $siteInfo->dealerName serves the " . 
				$siteInfo->getCities(array("conjunction" => "and", "delim" => ",")) . "areas. Call " .
				"us today at $siteInfo->phoneNumber for a great deal on your next vehicle purchase."
				
			),
		"View Our Ad" => new EnhancedPage("view-our-ad",
				"$siteInfo->dealerCity Used and Pre-owned " . $siteInfo->getMakes() . " Promotional Offers | " . $siteInfo->getCities(array("conjunction" => "", "delim" => ",")) . " | $siteInfo->dealerName |  $siteInfo->dealerState",
				"View " . $siteInfo->dealerName . "'s current ads and promotional offers for used " .
				$siteInfo->getMakes() . ". Get a great deal on your next " . 
				$siteInfo->getMakes(array("conjunction" => "or", "delim" => ",")) .
				" in the " . $siteInfo->getCities(array("conjunction" => "and", "delim" => ","), true) . 
				" areas today.",
				"At $siteInfo->dealerName, check out our special offers for " . 
				$siteInfo->getMakes() . " vehicles.  With these offers, you can save thousands on the new car or truck you're looking for. Make sure to pick up the phone and call $siteInfo->phoneNumber to get the latest unpublished specials!"
		)
	); // END $pages array
      
?>