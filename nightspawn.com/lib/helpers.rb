include Nanoc3::Helpers::Breadcrumbs
include Nanoc3::Helpers::LinkTo
include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::Rendering

def create_archive_pages
  article_groups().each_with_index do |subarticles, i|
    first = (i+1)*config[:page_size] + 1
    last  = (i+2)*config[:page_size]

    @items << Nanoc3::Item.new(
      "<%= render('_blog_archive', :index => #{i}) %>",
      { :title => "Rants archive page #{i+1}", :rantarchive => true, :abstract => "(posts #{first} to #{last})"},
      archive_page(i),
      :binary => false
    )
  end 
end

def article_groups 
  articles_to_paginate = sorted_articles
  articles_to_paginate.slice!(0..@config[:page_size]-1);
  article_groups = []
  until articles_to_paginate.empty?
    article_groups << articles_to_paginate.slice!(0..@config[:page_size]-1)
  end
  article_groups.to_a
end

def archive_page(index) 
  "/rants/#{index}/"
end

def archive_items
  @items.find_all{ |itm| itm[:rantarchive] }
end

def create_tag_pages
  tag_set(items).each do |tag|
    item = Nanoc3::Item.new(
      "<%= render('_tag_page', :tag => '#{tag}') %>",      # use locals to pass data
      { :title => "rants tagged with \"#{tag}\"", :hidden => true},         # do not include in aside
      "/rants/tags/#{tag}/",                               # identifier
      :binary => false
    )
    items << item
  end
end


def tag_set(items=nil)
  items = @items if items.nil?
  tags = Set.new
  items.each do |item|
    next if item[:tags].nil?
    item[:tags].each { |tag| tags << tag }
  end
  tags.to_a
end

def items_for_tag(tag)
  tagitems = Set.new
  items.each do |i|
    next if i[:tags].nil?
    if !i[:tags].detect{|t| t == tag}.nil?
      tagitems << i
    end
  end
  tagitems.to_a.sort_by{ |a| Time.parse(a[:created_at]) }
end

def item_for_id(id) 
  items.detect{ |itm| itm[:identifier] == id }
end

# Copy static assets outside of content instead of having nanoc3 process them.
def copy_static
  FileUtils.cp_r 'static/.', 'output/'
end

