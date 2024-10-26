import { ObjectId } from "mongodb";

import { Router, getExpressRouter } from "./framework/router";

import { Authing, Friending, Sessioning, Profiling, EventHosting, Setting } from "./app";
// import { PostOptions } from "./concepts/posting";
import { SessionDoc } from "./concepts/sessioning";
import Responses from "./responses";

import { z } from "zod";

/**
 * Web server routes for the app. Implements synchronizations between concepts.
 */
class Routes {
  // Synchronize the concepts from `app.ts`.

  //session
  @Router.get("/session")
  async getSessionUser(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    console.log("lol")
    return await Authing.getUserById(user);
  }


  // @Router.get("/session/id")
  // async getUserId(session: SessionDoc) {
  //   const user = Sessioning.getUser(session);
  //   console.log("hi", user.id)
  //   return user;
  // }

  @Router.post("/users")
  async createUser(session: SessionDoc, username: string, password: string, name: string, phone: number, age: number) {
    Sessioning.isLoggedOut(session);
    return await Authing.create(username, password, name, phone, age);
  }

  @Router.post("/login")
  async logIn(session: SessionDoc, username: string, password: string) {
    const u = await Authing.authenticate(username, password);
    Sessioning.start(session, u._id);
    return { msg: "Logged in!" };
  }


  @Router.post("/logout")
  async logOut(session: SessionDoc) {
    Sessioning.end(session);
    return { msg: "Logged out!" };
  }

  //profiles:

  @Router.get("/profiles/info")
  async getProfile(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    // const username = (await Profiling.getProfile(user))?.username;
    return await Profiling.getProfile(user);

  }

  @Router.patch("/profiles/username")
  async updateUsername(session: SessionDoc, username: string) {
    const user = Sessioning.getUser(session);
    return await Profiling.updateUsername(user, username);
  }

  @Router.patch("/profiles/password")
  async updatePassword(session: SessionDoc, currentPassword: string, newPassword: string) {
    const user = Sessioning.getUser(session);
    return Profiling.updatePassword(user, currentPassword, newPassword);
  }

  @Router.patch("/profiles/name")
  async updateName(session: SessionDoc, newName: string) {
    const user = Sessioning.getUser(session);
    return Profiling.updateName(user, newName);
  }

  @Router.patch("/profiles/location")
  async updateLocation(session: SessionDoc, newCity: string, newState: string) {
    const user = Sessioning.getUser(session);
    return Profiling.updateLocation(user, newCity, newState);
  }

  @Router.patch("/profiles/language")
  async updateLanguage(session: SessionDoc, newLanguage: string) {
    const user = Sessioning.getUser(session);
    return Profiling.updateLanguage(user, newLanguage);
  }

  @Router.delete("/profiles")
  async deleteUser(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    Sessioning.end(session);
    return await Profiling.delete(user);
  }

  @Router.delete("/profiles/filters/reset")
  async resetFilters(session: SessionDoc){
    const user = Sessioning.getUser(session);
    return await Profiling.clearFilters(user);
  }
  //eventhosts:

  @Router.post("/eventhosts")
  async createEvent(session: SessionDoc, title: string, description: string, date: number, time: string, spots: number) {
    const user = Sessioning.getUser(session);
    const created = await EventHosting.create(user, title, description, date, time, spots);
    return { msg: created.msg, event: await Responses.event(created.event) };
  }

  @Router.delete("/eventhosts/:id")
  //can only delete event if user is organizer of event
  async deleteEvent(session: SessionDoc, id: string) {
    console.log("lololool")
    const user = Sessioning.getUser(session);
    const oid = new ObjectId(id);
    await EventHosting.assertOrganizerIsUser(oid, user);
    return EventHosting.delete(oid);
  }

  @Router.patch("/eventhosts/:id")
  async editEvent(session: SessionDoc, id: string, title: string, description: string, date: number) {
    console.log("HI")
    const user = Sessioning.getUser(session);
    const oid = new ObjectId(id);
    await EventHosting.assertOrganizerIsUser(oid, user);
    console.log("yep")
    return EventHosting.update(oid, title, description, date);
  }


  @Router.get("/eventhosts")
  @Router.validate(z.object({ author: z.string().optional() }))
  async getEvents(author?: string) {
    let events;
    if (author) {
      const id = (await Authing.getUserByUsername(author))._id;
      events = await EventHosting.getByOrganizer(id);
    } else {
      events = await EventHosting.getAllEvents();
    }
    const authors = await Promise.all(events.map(async (event) => await Authing.getUserById(event.organizer)));
    return {events, authors};
  }


  // @Router.get("/eventhosts")
  // async getAllEvents() {
  //   return await EventHosting.getAllEvents();
  // }

  @Router.patch("/eventhosts/addtag")
  async addEventTag(session: SessionDoc, id: string, tag: string) {
    const user = Sessioning.getUser(session);
    const oid = new ObjectId(id);
    await EventHosting.assertOrganizerIsUser(oid, user);
    return EventHosting.addTag(oid, tag);
  }

  @Router.patch("/eventhosts/signups/:id")
  async eventSignup(session: SessionDoc, id: string) {
    const user = Sessioning.getUser(session);
    const oid = new ObjectId(id);
    return EventHosting.signup(user, oid);
  }

  @Router.patch("/eventhosts/waitlists/:id")
  async eventWaitlist(session: SessionDoc, id: string) {
    console.log("c")
    const user = Sessioning.getUser(session);
    const oid = new ObjectId(id);
    return EventHosting.waitlist(user, oid);
  }

  @Router.delete("/eventhosts/removesignups/:id")
  async removeSignup(session: SessionDoc, id: ObjectId) {
    const user = Sessioning.getUser(session);
    const oid = new ObjectId(id);
    return EventHosting.removeSignup(user, oid);
  }

  @Router.delete("/eventhosts/removewaitlists/:id")
  async removeWaitlist(session: SessionDoc, id: ObjectId) {
    const user = Sessioning.getUser(session);
    const oid = new ObjectId(id);
    return EventHosting.removeWaitlist(user, oid);
  }

  @Router.patch("/eventhosts/filters/add/:filter")
  async addFilter(session: SessionDoc, filter:string) {
    console.log("d")
    const user = Sessioning.getUser(session);
    return EventHosting.addFilter(user, filter);
  }

  // @Router.delete("/eventhosts/filters/reset")
  // async resetFilters(session: SessionDoc){
  //   const user = Sessioning.getUser(session);
  //   return Profiling.clearFilters(user);
  // }

  @Router.get("/profiles/signedup")
  async getSignedup(session: SessionDoc){
    const user = Sessioning.getUser(session);
    return Profiling.getSignedup(user);
  }

  @Router.get("/profiles/waitlisted")
  async getWaitlisted(session: SessionDoc){
    const user = Sessioning.getUser(session);
    return Profiling.getWaitlisted(user);
  }


  //instruction's actions are static and unchangeable, so they don't need to be recorded outside of a session
  //and can be included on the page in the ui design aspect
  
  // friendshiphub
  @Router.post("/friend/profile")
  async createFriendshipHubProfile(session: SessionDoc, bio: string, genderPronouns: string) {
    const user = Sessioning.getUser(session);
    return await Friending.createProfile(user, bio, genderPronouns);
  }

  @Router.patch("/friend/profile")
  async updateFriendshipHubProfile(session: SessionDoc, bio?: string, genderPronouns?: string) {
    const user = Sessioning.getUser(session);
    return await Friending.updateProfile(user, bio, genderPronouns);
  }

  @Router.get("/friend/profiles")
  async getFriendshipProfile(session: SessionDoc) {
    console.log("yes")
    const user = Sessioning.getUser(session);
    console.log("LOL")
    return await Friending.getFriendshipProfile(user);
  }

  @Router.delete("/friend/profile")
  async deleteFriendshipHubProfile(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    return await Friending.deleteProfile(user);
  }

  @Router.patch("/friend/profile/addinterest")
  async addFriendInterest(session: SessionDoc, interest: string) {
    const user = Sessioning.getUser(session);
    return await Friending.addInterest(user, interest);
  }

  @Router.get("/friend/profile/getinterests")
  async getFriendInterests(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    console.log('here', await Friending.getInterests(user))
    return await Friending.getInterests(user);
  }

  @Router.patch("/friend/profile/removeinterest")
  async removeFriendInterest(session: SessionDoc, interest: string) {
    const user = Sessioning.getUser(session);
    return await Friending.removeInterest(user, interest);
  }

  @Router.get("/friend/compatible")
  async getCompatibleFriends(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    console.log("COMPATIBLE", await Friending.getCompatibleFriends(user))
    return await Friending.getCompatibleFriends(user);
  }

  @Router.post("/friend/sendrequest")
  async sendFriendRequest(session: SessionDoc, to_id: string, message?: string) {
    const user = Sessioning.getUser(session);
    const toOid = new ObjectId(to_id);
    console.log("sending", user, to_id);
    await Friending.createMessage(user, toOid, message!);
    return await Friending.sendRequest(user, toOid, message);
  }

  @Router.put("/friend/acceptrequest")
  async acceptFriendRequest(session: SessionDoc, from_id: string) {
    const user = Sessioning.getUser(session);
    const fromOid = new ObjectId(from_id);
    return await Friending.acceptRequest(fromOid, user);
  }

  @Router.put("/friend/rejectrequest/:from_id")
  async rejectFriendRequest(session: SessionDoc, from_id: string) {
    const user = Sessioning.getUser(session);
    const fromOid = new ObjectId(from_id);
    return await Friending.rejectRequest(fromOid, user);
  }

  @Router.delete("/friend/removerequest/:to_id")
  async removeFriendRequest(session: SessionDoc, to_id: string) {
    const user = Sessioning.getUser(session);
    const toOid = new ObjectId(to_id);
    return await Friending.removeRequest(user, toOid);
  }

  @Router.get("/friend/requests")
  async getAllRequests(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    return await Responses.friendRequests(await Friending.getAllRequests(user));
  }

  @Router.get("/friend/getsentrequests")
  async getSentRequests(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    return await Friending.sentRequests(user);  
  }


  @Router.get("/friend/getsentrequests/profile")
  async fromSentRequesttoProfile(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    const sentRequests =  await Friending.sentRequests(user); 
    const sentUsers = sentRequests.map(request => request.to);
    const sentProfiles = await Promise.all(sentUsers.map(user => Profiling.getProfilebyUserId(user))); 
    return sentProfiles; 
  }


  @Router.get("/friend/getreceivedrequests")
  async getReceivedRequests(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    return await Friending.receivedRequests(user);  
  }

  @Router.get("/friend/getreceivedrequests/profile")
  async fromReceivedRequesttoProfile(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    const receivedRequests = await Friending.receivedRequests(user);
    const receivedUsers = receivedRequests.map(request => request.from);
    const receivedProfiles = await Promise.all(receivedUsers.map(user => Profiling.getProfilebyUserId(user))); 
    return receivedProfiles; 
  }


  @Router.get("/friend/getfriends")
  async getFriends(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    const curFriends =  await Friending.getFriends(user); 
    const friendProfiles = await Promise.all(curFriends.map(userid => Profiling.getProfilebyUserId(userid)));
    return friendProfiles;
  }

  @Router.get("/friend/getfriends/profile")
  async fromFriendIdstoProfile(session: SessionDoc) {
    const user = Sessioning.getUser(session);

  }

  @Router.delete("/friend/removefriend/:to_id")
  async removeFriend(session: SessionDoc, to_id: string) {
    const user = Sessioning.getUser(session);
    const toOid = new ObjectId(to_id);
    return await Friending.removeFriend(user, toOid);
  }

  @Router.post("/friend/profile/sendmessage/:to_id")
  async sendMessage(session: SessionDoc, to_id: string, content: string) {
    const user = Sessioning.getUser(session);
    const toOid = new ObjectId(to_id);
    return await Friending.createMessage(user, toOid, content);

  }

  @Router.get("/friend/profile/chat/:to_id")
  async getChatExchange(session: SessionDoc, to_id: string) {
    const user = Sessioning.getUser(session);
    const toOid = new ObjectId(to_id);
    return await Friending.getChat(user, toOid);
  }


  // settings 

  @Router.get("/setting")
  async getCurrentSettings(session: SessionDoc){
    const user = Sessioning.getUser(session);
    return await Setting.getCurrentSettings(user);
  }

  @Router.patch("/setting/instruction")
  async toggleInstructionsSetting(session: SessionDoc){
    const user = Sessioning.getUser(session);
    return await Setting.toggleInstructions(user);
  }

  @Router.patch("/setting/color")
  async changeColor(session: SessionDoc, hex: number){
    const user = Sessioning.getUser(session);
    return await Setting.changeColor(user, hex);
  }

  @Router.patch("/setting")
  async resetSettings(session: SessionDoc) {
    const user = Sessioning.getUser(session);
    return await Setting.resetSettings(user);
  }



}

/** The web app. */
export const app = new Routes();

/** The Express router. */
export const appRouter = getExpressRouter(app);
