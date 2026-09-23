# VehicleMall — three apps, one vehicle-lifecycle system

Source of record: `Portfolio Zeppstr.pdf` (Case Studies & Portfolio), App
Development section. Client: VehicleMall · India · Automotive marketplace and
finance technology.

## The situation

VehicleMall operates across the used-vehicle economy, where a single asset moves
through several disconnected stages: it gets valued, it gets auctioned, and — when
finance is involved and payments stop — it gets repossessed, stored and released.

Each stage was a different workflow with a different user. Dealers and bidders
needed to transact. Finance institutions needed custody and control. Buyers needed
a price they could trust before either of those happened.

The work was not a marketing campaign. It was building the software those stages
run on.

## The diagnosis

Treating these as three separate products would have been the obvious move and the
wrong one. They are three views of the same asset.

A valuation informs the auction reserve. An auction outcome validates the
valuation. A repossession feeds inventory back into the auction. Build them in
isolation and you get three tools that each require their own data entry and none
of which can settle a disagreement about what a vehicle is actually worth.

So the requirement was one asset record, three interfaces onto it — and, critically,
real-time data capture at every stage, because the value of the system is entirely
determined by whether the record is current when someone needs to act on it.

## What we did

**Final Auction — online and offline vehicle auctions.**
Built for auctions that run in both modes at once, so a bidder in the room and a
bidder on a phone compete on equal footing. Mobile bidding, real-time updates, and
award to the highest bidder without the lag that makes hybrid auctions fail.
Delivered for mobile and desktop.

**iVehicleValue — multi-asset valuation.**
Accurate valuations across trucks, cars, bikes, farm equipment and commercial
equipment — categories that price on completely different logic. One interface,
reliable market pricing, built to be usable by someone who is not a valuer.

**VMALL YMS — yard management for finance institutions.**
Built for NBFCs, banks and finance institutions. Captures real-time vehicle data
from the moment of repossession through to yard exit: comprehensive tracking
across custody, condition and release, optimised for institutional compliance
requirements rather than dealer convenience.

## What changed

Three production applications shipped across mobile and desktop, covering
valuation, transaction and custody — the full lifecycle of a financed vehicle from
price discovery through auction to repossession and release.

The delivered scope:

| Product | Users | Core capability |
| --- | --- | --- |
| Final Auction | Dealers, bidders | Hybrid online/offline bidding, real-time updates |
| iVehicleValue | Buyers, sellers, valuers | Multi-category valuation, market pricing |
| VMALL YMS | NBFCs, banks, finance institutions | Repossession-to-exit tracking |

## What this proves

Most agencies stop at the marketing layer and hand the product problem to someone
else. When the growth constraint is that the product does not yet exist in a usable
form, that hand-off is where the engagement fails.

Building all three surfaces against one asset model meant each product made the
others more valuable rather than duplicating them — the same compounding logic we
apply to channels, applied to software.
