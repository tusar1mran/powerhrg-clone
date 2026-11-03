import Reveal from "../Reveal";
import VideoPoster from "../VideoPoster";

export default function VideoBlock({ id, title, poster }: { id?: string; title: string; poster: string }) {
  return (
    <section id={id} className="mx-auto max-w-[1150px] px-6 py-12">
      <Reveal>
        <VideoPoster title={title} poster={poster} />
      </Reveal>
    </section>
  );
}
