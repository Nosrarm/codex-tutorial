# Lunch Team Randomizer Platform

## Vision
Create a modular lunch team coordination platform deployable via Docker. The system allows companies to register employees, automatically create weekly lunch teams, track exclusions, manage restaurant choices, and capture statistics about team lunches. Each capability is packaged as a service so that the platform can evolve or scale like a microservices architecture (MSA).

## Core Requirements Breakdown
1. **Member Management**
   - CRUD operations for members (name, department, dietary notes, etc.).
   - Bulk import/export (CSV) for onboarding.
   - Role-based access control for administrators vs. regular users.

2. **Random Team Generation**
   - Scheduler triggers once per week (configurable weekday/time).
   - Pure random assignment balanced by team size or capacity constraints.
   - Ability to run manual ad-hoc generation with preview before finalizing.

3. **Exclusion Handling**
   - UI to select members to exclude for a specific run.
   - Persist ad-hoc exclusions with expiration dates (e.g., vacation).
   - Apply exclusions when generating teams.

4. **Exclusion Presets**
   - Maintain named exclusion sets ("Vacation", "Remote Workers", etc.).
   - Allow cloning/editing presets for quick reuse.
   - Audit trail of who modified presets.

5. **History & Analytics**
   - Persist every generated team with timestamp and selected restaurant.
   - Statistics per member: count of shared lunches with others, most frequent teammates.
   - Restaurant statistics: visit counts, average team size, recent trends.
   - Exportable dashboards (CSV, chart images, PDF).

6. **History Corrections**
   - Admin workflow to edit or delete erroneous team records.
   - All changes logged for auditing.
   - Automatic recomputation of statistics after edits.

7. **Restaurant Management**
   - CRUD for restaurants (cuisine, distance, capacity, dietary tags).
   - Support for status flags (e.g., unavailable/closed).
   - Optional integration with Google Maps for directions.

8. **Team Meal Selection**
   - Once a team is formed, members vote or choose from registered restaurants.
   - Real-time updates (websocket) showing selections.
   - Option to lock the final choice after consensus.

9. **Gamified Selection Mechanics**
   - Provide at least five mini-games to decide lunch spots:
     1. Spinning Wheel (roulette style).
     2. Ladder Game (Korean-style "sadal-ligi").
     3. Card Flip randomizer.
     4. Dice Roll tournament.
     5. Slot Machine animation.
   - Each mini-game consumes the list of eligible restaurants and returns a winner.

10. **Modular Architecture (MSA Inspired)**
    - Each major domain (members, teams, exclusions, restaurants, analytics, games) as a separate service.
    - Services communicate via REST/GraphQL APIs and publish domain events via message broker (e.g., RabbitMQ or Kafka).
    - Shared identity/authentication service (JWT-based) for SSO across services.
    - Use API gateway for routing, rate limiting, and aggregation.

## Proposed Microservice Landscape
| Service | Responsibilities | Technology Stack |
|---------|------------------|------------------|
| Identity Service | Auth, roles, JWT issuance, SSO | Node.js (NestJS) + PostgreSQL |
| Member Service | Member CRUD, exclusion presets | Node.js (Express/NestJS) + PostgreSQL |
| Team Orchestrator | Weekly scheduler, randomization logic, history records | Node.js (NestJS) + Redis for locks + PostgreSQL |
| Restaurant Service | Restaurant CRUD, availability | Node.js + PostgreSQL |
| Analytics Service | Aggregation pipelines, statistics API | Node.js or Python FastAPI + ClickHouse/TimescaleDB |
| Game Engine Service | Hosts mini-games, exposes websocket endpoints | Node.js + Socket.IO |
| Frontend (React) | SPA for admin & member portals | React + Redux Toolkit + TypeScript |
| API Gateway | Routes requests, enforces auth, handles BFF features | Kong/Nginx or custom Node.js gateway |

## Data Model Highlights
- **Member**: id, name, contact, department, tags, active flag.
- **ExclusionPreset**: id, name, memberIds[], effectiveFrom, effectiveTo.
- **TeamRun**: id, runDate, creatorId, status, restaurantId, notes.
- **TeamAssignment**: teamRunId, teamIndex, memberIds[].
- **Restaurant**: id, name, category, priceTier, location, status.
- **LunchVote**: teamRunId, memberId, restaurantId, vote, timestamp.

## Workflow Overview
1. Admin adds members and optionally defines exclusion presets.
2. Scheduler triggers Team Orchestrator weekly.
3. Orchestrator requests exclusions from Member Service, fetches active members, and randomizes teams.
4. Generated teams saved into history and broadcast via event bus.
5. Teams join a session in the Game Engine to pick a restaurant using a mini-game. Selection updates the TeamRun record.
6. Analytics Service consumes events to update statistics dashboards.

## Frontend Experience
- **Admin Portal**
  - Manage members, presets, restaurants via form-driven UIs.
  - View dashboards, correct history entries.
  - Configure scheduler (day/time, team size).
- **Member Portal**
  - View assigned team, confirm participation.
  - Participate in restaurant selection games.
  - View personal lunch stats and history.

## Deployment & DevOps
- Docker Compose for local development, with each service in its container.
- CI/CD pipeline building Docker images, running tests, and deploying to container registry.
- Kubernetes (optional) for production orchestration with Helm charts per service.
- Centralized logging (ELK stack) and monitoring (Prometheus + Grafana).

## Security & Compliance
- Enforce OAuth2 / SSO integration for enterprises.
- Encrypt sensitive data at rest (PostgreSQL TDE) and in transit (HTTPS).
- Audit trails stored immutably for compliance.

## Future Enhancements
- Mobile app (React Native) for on-the-go team updates.
- Integration with corporate calendars (Google Workspace, Outlook) to auto-block lunch slots.
- Machine learning suggestions for team compositions balancing inter-departmental mixing.

## Next Steps
1. Build wireframes for both portals.
2. Define API contracts using OpenAPI/AsyncAPI specs.
3. Set up monorepo or multi-repo structure with shared libraries (e.g., protobuf schemas, UI kit).
4. Implement CI templates and Git hooks for linting and tests.
5. Create seed data and test scenarios for randomization fairness.
